/**
 * Content for the 2026 REBUILT robot page, transcribed from the team's 2026 Technical Binder.
 * Keeping it out of the component keeps the page file readable and the copy easy to update.
 */

export interface SpecGroup {
  heading: string
  bullets: string[]
}

export interface BinderSection {
  id: string
  title: string
  lead: string
  image: string
  /** CAD renders ship on a white background, so they sit on a light plate instead of bleeding into the navy. */
  plate?: boolean
  specs: SpecGroup[]
}

export const QUICK_SPECS = [
  { value: '27.5" × 27.5"', label: "Frame perimeter" },
  { value: "~16 ft/s", label: "MK4i L3 swerve" },
  { value: "~40", label: "Fuel capacity" },
  { value: "6 / sec", label: "Fuel throughput" },
  { value: "15°–50°", label: "Hood range" },
  { value: "360°", label: "Turret rotation" },
]

export const GAME_ANALYSIS =
  "Fuel stands out as the primary source of points, but the Hub shift system limits when alliances can score, making cycle timing critical. While Tower climbing appears less impactful than Fuel scoring, the Traversal RP provides strong incentive to climb. Because winning Auto sets the shift order, autonomous consistency is essential. For endgame, Tower climbing's point values and RP implications make reliability a key differentiator."

export const KEY_TAKEAWAYS = [
  "Prioritize fast cycles and high throughput",
  "Aim for 40–50 fuel capacity",
  "Use the trench whenever possible",
  "Treat the climb as secondary",
  "Avoid overinvesting in SOTM and turrets unless already optimized",
  "Simple, consistent cycling beats complex optimizations",
]

export const ANALYSIS_CARDS: SpecGroup[] = [
  {
    heading: "Fuel Throughput",
    bullets: [
      "6 fuel/sec intake and shooting is very strong",
      "High throughput overall is a major advantage in cycles",
    ],
  },
  {
    heading: "Fuel Storage",
    bullets: [
      "40–50 capacity is the optimal balance",
      "55 hits diminishing returns and isn't worth the design tradeoffs",
    ],
  },
  {
    heading: "Cycle Paths",
    bullets: [
      "Trench beats depot, especially in auton",
      "Trench cycles faster even with less storage and more defense time",
    ],
  },
  {
    heading: "Climbing",
    bullets: [
      "Decent for points, but not a primary focus",
      "More valuable for lower-tier and second-pick robots",
      "Likely role: L3 climb plus defense support",
    ],
  },
  {
    heading: "Passing",
    bullets: [
      "Passing to self is only ~10–20% better than normal cycling",
      "Under defense it breaks even or worse",
      "Likely uncommon in early-week quals",
    ],
  },
  {
    heading: "Shooting While Moving",
    bullets: [
      "Fixed shooter: worth it at a ≤7–10% accuracy drop, assuming ≥80% normal accuracy",
      "Turreted shooter: worth it at a ≤15–20% accuracy drop",
      "Overall gain is small, roughly 5–10%",
    ],
  },
]

export const STRATEGY_QUESTIONS = [
  "What are the non-negotiable decisions we make every single match?",
  "What deserves its own space, and what can logically live together?",
  "How do we separate auto, tele, and endgame without making it feel fragmented?",
  "How do we account for hub active vs inactive in a way that is clear but not cluttered?",
  "What should someone understand within 5 seconds of looking at it?",
]

export const PROTOTYPES = [
  {
    image: "/static/robot2026/proto-hopper.jpg",
    title: "Hopper mock-up",
    body: "A full-scale wooden box let us check fuel capacity, wall angles, and how reliably game pieces settle toward the base before cutting any polycarbonate.",
  },
  {
    image: "/static/robot2026/proto-shooter.jpg",
    title: "Shooter prototype",
    body: "Rollers and gears controlled launch speed and consistency, laser-cut side plates allowed rapid design changes, and tight shaft spacing kept the assembly aligned and low-friction.",
  },
  {
    image: "/static/robot2026/proto-turret.jpg",
    title: "Turret prototype",
    body: "A laser-cut wooden turret (circular base, support framing, and motor mounting points) used to evaluate rotational movement, stability, and alignment.",
  },
]

export const DESIGN_SECTIONS: BinderSection[] = [
  {
    id: "drivebase",
    title: "Drivebase",
    lead: "The drivebase is the foundation for the robot. It carries every mechanism on the field and is responsible for movement.",
    image: "/static/robot2026/drivebase.jpg",
    plate: true,
    specs: [
      {
        heading: "Chassis",
        bullets: ['27.5" × 27.5" frame allows for consistent maneuverability'],
      },
      {
        heading: "4× MK4i swerve modules (L3 gear configuration)",
        bullets: [
          "~16 ft/s for fast cycling across the field",
          "Allows for free strafe and full rotation",
        ],
      },
      {
        heading: "Brainpan",
        bullets: [
          "Electronics face outward for fast pit access and repairs",
          "Polycarbonate cover protects from in-match damage",
        ],
      },
      {
        heading: "3D-printed corner pads",
        bullets: [
          "Absorb impacts from the bump and from defense",
          "Enable fast, reliable bumper swaps",
        ],
      },
    ],
  },
  {
    id: "intake",
    title: "Intake",
    lead: "The intake collects fuel off the floor and drives it up into the hopper, staying planted at any pivot angle.",
    image: "/static/robot2026/intake.jpg",
    plate: true,
    specs: [
      {
        heading: "Pivot gearbox (Kraken X44, 36:1)",
        bullets: [
          "High torque ratio holds the intake firmly at any angle",
          "The X44 is lightweight and powerful for a pivot application",
        ],
      },
      {
        heading: "Intake rollers (Kraken X60, 2:1 and 4:3)",
        bullets: [
          "Front poly roller at 2:1 grabs and guides fuel inward",
          "Rear poly roller wrapped in grip tape at 4:3 pushes fuel up into the hopper",
          "The differing ratios create a compression gradient that moves fuel through smoothly",
        ],
      },
      {
        heading: '3" flex wheels',
        bullets: [
          'Compress around the 5.91" foam fuel for a secure grip',
          "Forgiving on misaligned or bouncing game pieces",
        ],
      },
      {
        heading: "SRPP plates",
        bullets: ["Survive repeated ground contact and collisions without cracking or deforming"],
      },
    ],
  },
  {
    id: "hopper",
    title: "Hopper",
    lead: "The hopper is the robot's storage system, holding fuel between pickup and scoring.",
    image: "/static/robot2026/hopper.jpg",
    plate: true,
    specs: [
      {
        heading: "Polycarbonate walls",
        bullets: [
          "Lightweight and flexible enough to hold a larger capacity",
          "Durable enough to survive match contact",
        ],
      },
      {
        heading: "Constant-force spring retraction",
        bullets: [
          "The intake pivot pushes the hopper walls out when deployed",
          "Springs retract the hopper when the intake stows",
        ],
      },
      {
        heading: "~40 fuel capacity",
        bullets: [
          "Stores enough fuel for a full scoring run without returning to the depot",
          "Fewer cycles means more time for shooting",
        ],
      },
      {
        heading: "Feeds into the spindexer",
        bullets: [
          "Fuel flows by gravity into the spindexer at the hopper's base",
          "No active handoff needed",
        ],
      },
    ],
  },
  {
    id: "serializer",
    title: "Serializer",
    lead: "The serializer moves fuel from the hopper into the shooter in a controlled, consistent stream.",
    image: "/static/robot2026/serializer.jpg",
    plate: true,
    specs: [
      {
        heading: "Spindexer (Kraken X60, 6:1)",
        bullets: [
          '6" Colson on a dead axle rotates fuel into the feeder',
          "6:1 provides enough torque to move multiple balls without stalling",
        ],
      },
      {
        heading: "Feeder (Kraken X44, 2:1)",
        bullets: [
          '3" flex wheels compress around fuel for reliable, consistent feeding',
          "2:1 keeps fuel moving quickly into the turret",
          "A ramp guides fuel smoothly from the feeder up into the shooter",
        ],
      },
    ],
  },
  {
    id: "turret",
    title: "Turret & E-Chain",
    lead: "The turret and e-chain work together to enable fast, full-rotation target tracking without risking wire damage.",
    image: "/static/robot2026/turret.png",
    plate: true,
    specs: [
      {
        heading: "Turret (Kraken X60, 65:1)",
        bullets: [
          "High torque ratio enables precise, repeatable positioning",
          "Dual encoders at 300:16 and 300:17 cancel backlash for accurate angle tracking",
        ],
      },
      {
        heading: "E-chain",
        bullets: [
          "3D printed in PLA, with 40 links and one end link attached to the turret base",
          "Houses the power and CAN wiring for the turret",
          "Lets the turret spin at speed with no risk of tangling wires",
          "Polycarbonate guides keep the chain in its track",
        ],
      },
    ],
  },
  {
    id: "shooter",
    title: "Shooter",
    lead: "The shooter converts stored fuel into scored points, combining an adjustable hood and dual flywheels to deliver accurate, repeatable shots from anywhere on the field.",
    image: "/static/robot2026/shooter.jpg",
    plate: true,
    specs: [
      {
        heading: "Hood (Kraken X44, rack and pinion)",
        bullets: [
          "Adjustable hood angle from 15° to 50° for variable shot trajectories",
          "Rack and pinion gives direct, backlash-free linear control",
          "Hood gear reduction: 54/10 × 144/10",
        ],
      },
      {
        heading: "Flywheels (2× Kraken X60)",
        bullets: [
          "Dual motors provide torque for fast spin-up and consistent exit velocity",
          "Brass flywheel weights add rotational inertia, reducing speed drop between shots",
        ],
      },
      {
        heading: "Counterroller",
        bullets: [
          "Reduces backspin on fuel as it exits",
          "Improves shot consistency and arc predictability",
        ],
      },
      {
        heading: "Dual aluminum plates",
        bullets: [
          "Keep the shooter assembly rigid under repeated firing loads",
          "Prevent flex that would misalign the flywheels or hood",
        ],
      },
    ],
  },
]

export const SOFTWARE_SECTIONS: BinderSection[] = [
  {
    id: "sw-drivebase",
    title: "Drivebase",
    lead: "The drivebase software transforms sensor data into precise, field-relative motion, enabling the robot to move, aim, and adapt in real time.",
    image: "/static/robot2026/electronics.jpg",
    specs: [
      {
        heading: "Motors and sensing",
        bullets: [
          "4 Kraken X60 FOC motors per swerve module via TalonFX",
          "CANcoder absolute encoders on each module for precise steering feedback",
          "Pigeon 2 gyro provides yaw, pitch, and roll, falling back to a kinematics-derived heading if disconnected",
        ],
      },
      {
        heading: "Odometry",
        bullets: [
          "A high-frequency odometry thread runs independent of the main loop",
          "Wheel deltas accumulate between cycles to minimize latency",
          "Dual pose tracking via SwerveDrivePoseEstimator logs odometry-only and vision-corrected poses in parallel each cycle",
        ],
      },
      {
        heading: "Tuning and control",
        bullets: [
          "Built-in SysId routines for feedforward characterization and wheel radius calibration, selectable from the dashboard",
          "PathPlanner AutoBuilder configured with full robot dynamics for accurate motion modeling",
          "Field-relative ChassisSpeeds published to RobotState every cycle for AutoAim motion compensation",
        ],
      },
    ],
  },
  {
    id: "simulation",
    title: "Robot Simulation",
    lead: "The simulation replicates the physical robot's behavior entirely in code, enabling development and debugging without hardware.",
    image: "/static/robot2026/simulation.jpg",
    specs: [
      {
        heading: "AdvantageKit hardware abstraction",
        bullets: [
          "Separates robot logic from physical components",
          "Code runs identically in both virtual and real environments",
        ],
      },
      {
        heading: "Parallel development",
        bullets: [
          "Software works independently of mechanical build progress",
          "Code is written and verified while the robot is still being built or wired",
        ],
      },
      {
        heading: "Safe debugging and rapid iteration",
        bullets: [
          "Surfaces critical failures, like control loop errors, before they cause physical damage",
          "Resets and tunes complex behaviors and autonomous routines in seconds",
        ],
      },
    ],
  },
  {
    id: "turret-angle",
    title: "Turret Angle",
    lead: "The turret software enables precise target tracking without hard stops, resolving absolute position through dual-encoder math.",
    image: "/static/robot2026/turret-angle.jpg",
    specs: [
      {
        heading: "Absolute position seeding",
        bullets: [
          "Position-controlled via TalonFX, within the angle limits defined in TurretConstants",
          "Dual absolute encoders with different gear ratios seed absolute position using the Chinese Remainder Theorem, analogous to a vernier scale with no hard stop needed",
          "Seeding retries every 10s and times out after 30s",
          "Seeding is skipped above 0.1 rad/s so we never solve on a moving mechanism",
        ],
      },
      {
        heading: "Tracking",
        bullets: [
          "AutoAim passes turretOmega as a velocity feedforward alongside position setpoints, so the turret tracks smoothly during robot rotation with no lag",
          "At startup, config.coverageSatisfiesRange() verifies the encoder pair uniquely resolves across the full mechanical travel",
        ],
      },
    ],
  },
  {
    id: "vision",
    title: "Vision",
    lead: "The vision system fuses multi-camera AprilTag data with odometry to maintain a reliable field-relative pose estimate throughout the match.",
    image: "/static/robot2026/vision.jpg",
    specs: [
      {
        heading: "Cameras",
        bullets: [
          "Two Limelights with calibrated 3D camera poses defined in VisionConstants",
          "MegaTag 1 and MegaTag 2 are both supported and switchable at runtime",
        ],
      },
      {
        heading: "Measurement weighting",
        bullets: [
          "MegaTag 1 uses variable standard deviations: 0.75 m / 10° for multi-tag, 3 m / 30° for single-tag",
          "MegaTag 2 runs heading-locked, scaling xyStdDev 2× when close and 3× when far, with rotation effectively frozen (θStdDev = 9999999°)",
        ],
      },
      {
        heading: "Rejection and freshness",
        bullets: [
          "Measurements are rejected above a 360°/s yaw rate, preventing bad estimates during fast spins",
          "Each camera tracks its last processed timestamp and only accepts measurements once it advances, preventing duplicate pose injections",
          "VisionIOLimelight.updateRobotOrientation() feeds the robot's heading and yaw rate into both Limelights every cycle",
        ],
      },
    ],
  },
  {
    id: "autonomous",
    title: "Autonomous",
    lead: "Our autonomous routines combine path planning with alliance coordination, maximizing points scored before driver control begins.",
    image: "/static/robot2026/auto-aim.jpg",
    specs: [
      {
        heading: "Path following",
        bullets: [
          "The robot follows pre-calculated trajectories using feedforward plus feedback control on position error",
          "Paths are generated in PathPlanner and optimized to minimize curvature changes across splines, reducing torques that could cause wheel slip",
          "Both odometry and vision feed positioning during the routine",
        ],
      },
      {
        heading: "Routines",
        bullets: [
          "Taxi (center, left, right): always taxi then shoot, with the center taxi routed through the depot",
          "Single Swipe and Shoot (left, right)",
          "Double Swipe and Shoot (left, right)",
          "Outpost variants of both single and double swipe (right)",
        ],
      },
    ],
  },
  {
    id: "auto-aim",
    title: "Auto-Aim",
    lead: "AutoAim is the brain of the shooting system, solving for every shot parameter in real time while the robot is in motion.",
    image: "/static/robot2026/field-analysis.jpg",
    specs: [
      {
        heading: "Continuous solving",
        bullets: [
          "Runs every robot loop cycle, simultaneously solving for shooter RPM, hood angle, and turret heading",
        ],
      },
      {
        heading: "Motion-compensated target leading",
        bullets: [
          "Reads field-relative velocity and angular velocity from RobotState",
          "Computes the turret pivot's velocity in field space, accounting for its offset from the robot's center of rotation",
          "pivotVx = robotVx − robotOmega × pivotOffset.getY()",
          "pivotVy = robotVy + robotOmega × pivotOffset.getX()",
          "Because the pivot is not at the robot's center, spinning introduces additional translational velocity at the turret, a correction that matters",
        ],
      },
      {
        heading: "Iterative convergence",
        bullets: [
          "Three iterations solve for an accurate lead point",
          "Each iteration solves time-of-flight to the current aim point",
          "The target is advanced by TOF × robot velocity to find a new lead point, re-solving until projectile and moving target converge in time",
        ],
      },
    ],
  },
]
