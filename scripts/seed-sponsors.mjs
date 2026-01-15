import path from "node:path"
import { fileURLToPath } from "node:url"
import { readFile } from "node:fs/promises"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const projectRoot = path.resolve(__dirname, "..")

const STRAPI_API_URL =
  process.env.STRAPI_API_URL ||
  process.env.NEXT_PUBLIC_STRAPI_API_URL ||
  "https://innovative-luck-8fe8e1c24e.strapiapp.com/api"

const STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN
const SPONSORS_ENDPOINT = process.env.STRAPI_SPONSORS_ENDPOINT || "sponsors"

if (!STRAPI_API_TOKEN) {
  console.error("Missing STRAPI_API_TOKEN in environment.")
  process.exit(1)
}

const SPONSOR_TIER_DEFAULT = process.env.SPONSOR_TIER_DEFAULT || "sponsor"
const DRY_RUN = process.env.DRY_RUN === "true"

const sponsors = [
  {
    name: "QLS",
    website_url: "https://www.quarrylane.org/",
    logoPath: "public/static/sponsors/qls.png",
    display_order: 1
  },
  {
    name: "Notion",
    website_url: "https://www.notion.so",
    logoPath: "public/static/sponsors/notion-logo.png",
    display_order: 2
  },
  {
    name: "Intuitive Foundation",
    website_url: "https://www.intuitive-foundation.org/first-robotics/",
    logoPath: "public/static/sponsors/IntuitiveFoundation.png",
    display_order: 3
  },
  {
    name: "FIRST NorCal",
    website_url: "https://www.firstinspires.org/robotics/frc",
    logoPath: "public/static/sponsors/FIRST-NorCal.png",
    display_order: 4
  },
  {
    name: "Google",
    website_url: "https://about.google/brand-resource-center/guidance/sponsorships/",
    logoPath: "public/static/sponsors/googleLogo.png",
    display_order: 5
  },
  {
    name: "LDL",
    website_url: "https://littledesignlab.org/",
    logoPath: "public/static/sponsors/ldl.svg",
    display_order: 6
  }
]

function normalizeBaseUrl(url) {
  return url.replace(/\/+$/, "")
}

async function fetchJson(url, options = {}) {
  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${STRAPI_API_TOKEN}`,
      ...options.headers
    },
    ...options
  })

  if (!response.ok) {
    const text = await response.text()
    const error = new Error(`Request failed ${response.status}: ${text}`)
    error.status = response.status
    throw error
  }

  return response.json()
}

function buildEndpoint(pathSegment) {
  return `${normalizeBaseUrl(STRAPI_API_URL)}/${pathSegment.replace(/^\/+/, "")}`
}

async function findSponsorByName(name) {
  const params = new URLSearchParams({
    "filters[name][$eq]": name
  })
  const url = `${buildEndpoint(SPONSORS_ENDPOINT)}?${params.toString()}`
  const result = await fetchJson(url)
  const data = Array.isArray(result?.data) ? result.data : []
  return data.length > 0 ? data[0] : null
}

async function uploadLogo(logoPath) {
  const filePath = path.resolve(projectRoot, logoPath)
  const buffer = await readFile(filePath)
  const formData = new FormData()
  const filename = path.basename(filePath)
  const blob = new Blob([buffer])

  formData.append("files", blob, filename)

  if (DRY_RUN) {
    console.log(`[dry-run] upload ${logoPath}`)
    return { id: `dry-run-${filename}` }
  }

  const url = `${normalizeBaseUrl(STRAPI_API_URL)}/upload`
  const response = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${STRAPI_API_TOKEN}`
    },
    body: formData
  })

  if (!response.ok) {
    const text = await response.text()
    throw new Error(`Upload failed ${response.status}: ${text}`)
  }

  const uploaded = await response.json()
  const file = Array.isArray(uploaded) ? uploaded[0] : uploaded
  if (!file?.id) {
    throw new Error("Upload response missing file id.")
  }

  return file
}

async function createSponsor(sponsor, logoId) {
  const payload = {
    data: {
      name: sponsor.name,
      website_url: sponsor.website_url,
      display_order: sponsor.display_order,
      is_active: true,
      tier: SPONSOR_TIER_DEFAULT,
      logo: logoId
    }
  }

  const attemptEndpoints = [SPONSORS_ENDPOINT]
  if (!attemptEndpoints.includes("sponsors")) attemptEndpoints.push("sponsors")
  if (!attemptEndpoints.includes("sponsor")) attemptEndpoints.push("sponsor")

  const tryCreate = async (endpoint, method = "POST") => {
    const url = buildEndpoint(endpoint)
    if (DRY_RUN) {
      console.log(`[dry-run] ${method} ${endpoint}`, payload)
      return { ok: true }
    }

    await fetchJson(url, {
      method,
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    })
  }

  for (const endpoint of attemptEndpoints) {
    try {
      await tryCreate(endpoint, "POST")
      return
    } catch (error) {
      if (error?.status === 405) {
        await tryCreate(endpoint, "PUT")
        return
      }
      throw error
    }
  }

  throw new Error(
    "Unable to create sponsor. Set STRAPI_SPONSORS_ENDPOINT to the correct API path."
  )
}

async function main() {
  console.log("Seeding sponsors into Strapi...")

  for (const sponsor of sponsors) {
    const existing = await findSponsorByName(sponsor.name)
    if (existing) {
      console.log(`Skipping ${sponsor.name} (already exists).`)
      continue
    }

    console.log(`Uploading ${sponsor.name} logo...`)
    const uploadedLogo = await uploadLogo(sponsor.logoPath)
    const logoId = uploadedLogo.id

    console.log(`Creating sponsor ${sponsor.name}...`)
    await createSponsor(sponsor, logoId)
  }

  console.log("Sponsor seed complete.")
}

main().catch(error => {
  console.error(error)
  process.exit(1)
})
