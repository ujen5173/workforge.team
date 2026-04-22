import {
  DIFFICULTY_LEVEL,
  TASK_PRIORITY,
  TASK_STATUS,
  type Tasks,
} from "./types";

export const tasksData: Tasks[] = [
  {
    id: "task_001",
    title: "Setup Project Monorepo",
    description:
      "Initialize monorepo with Turborepo and configure shared packages.",

    tags: ["setup", "infra"],
    priority: TASK_PRIORITY.HIGH,
    difficultyLevel: DIFFICULTY_LEVEL.MEDIUM,

    status: TASK_STATUS.COMPLETED,
    progress: 100,

    assignedTo: [
      { id: "u1", name: "Ujen Basi", profile: "/a/u1.png", role: "Dev" },
    ],
    assignedBy: { id: "u0", name: "Tech Lead", profile: "/a/u0.png" },
    reviewers: [{ id: "u2", name: "Aayush", profile: "/a/u2.png" }],

    notes: "Use pnpm workspaces for better performance.",
    attachments: [],
    comments: [],
    discussions: [],

    activity: [
      {
        id: "act_1",
        type: "STATUS_CHANGED",
        message: "Task marked as completed",
        createdBy: { id: "u1", name: "Ujen Basi" },
        createdAt: new Date("2026-04-01"),
      },
    ],

    startDate: new Date("2026-03-28"),
    dueDate: new Date("2026-04-01"),
    completedAt: new Date("2026-04-01"),

    createdAt: new Date("2026-03-27"),
    updatedAt: new Date("2026-04-01"),
  },

  {
    id: "task_002",
    title: "Authentication System",
    description: "Implement JWT auth with refresh tokens.",

    tags: ["backend", "auth"],
    priority: TASK_PRIORITY.URGENT,
    difficultyLevel: DIFFICULTY_LEVEL.HIGH,

    status: TASK_STATUS.IN_PROGRESS,
    progress: 60,

    assignedTo: [
      { id: "u1", name: "Ujen Basi", profile: "/a/u1.png" },
      { id: "u3", name: "Ritika", profile: "/a/u3.png" },
    ],
    assignedBy: { id: "u0", name: "Tech Lead" },
    reviewers: [{ id: "u2", name: "Aayush" }],

    notes: "Token rotation pending.",
    attachments: [],
    comments: [
      {
        id: "c1",
        message: "We should use HTTP-only cookies.",
        author: { id: "u2", name: "Aayush" },
        createdAt: new Date("2026-04-10"),
      },
    ],

    discussions: [],

    activity: [
      {
        id: "act_2",
        type: "ASSIGNED",
        message: "Assigned to Ujen and Ritika",
        createdBy: { id: "u0", name: "Tech Lead" },
        createdAt: new Date("2026-04-05"),
      },
    ],

    dependencies: ["task_001"],

    startDate: new Date("2026-04-05"),
    dueDate: new Date("2026-04-20"),

    createdAt: new Date("2026-04-04"),
    updatedAt: new Date("2026-04-18"),
  },

  {
    id: "task_003",
    title: "Dashboard UI",
    description: "Build responsive dashboard layout.",

    tags: ["frontend", "ui"],
    priority: TASK_PRIORITY.HIGH,
    difficultyLevel: DIFFICULTY_LEVEL.MEDIUM,

    status: TASK_STATUS.NEED_REVIEW,
    progress: 90,

    assignedTo: [{ id: "u3", name: "Ritika" }],
    assignedBy: { id: "u0", name: "Tech Lead" },
    reviewers: [{ id: "u1", name: "Ujen Basi" }],

    attachments: [],
    comments: [],

    activity: [],

    startDate: new Date("2026-04-07"),
    dueDate: new Date("2026-04-15"),

    createdAt: new Date("2026-04-06"),
    updatedAt: new Date("2026-04-15"),
  },

  {
    id: "task_004",
    title: "Stripe Payment Integration",
    description: "Integrate Stripe checkout and webhooks.",

    tags: ["payments", "backend"],
    priority: TASK_PRIORITY.URGENT,
    difficultyLevel: DIFFICULTY_LEVEL.HIGH,

    status: TASK_STATUS.BLOCKED,
    progress: 40,

    assignedTo: [{ id: "u4", name: "Nischal" }],
    assignedBy: { id: "u0", name: "Tech Lead" },

    obstaclesContext: "Webhook timeout issue",

    attachments: [],
    comments: [],
    activity: [],

    startDate: new Date("2026-04-08"),
    dueDate: new Date("2026-04-22"),

    createdAt: new Date("2026-04-08"),
    updatedAt: new Date("2026-04-19"),
  },

  {
    id: "task_005",
    title: "API Documentation",
    description: "Document all endpoints using Swagger.",

    tags: ["docs"],
    priority: TASK_PRIORITY.MEDIUM,
    difficultyLevel: DIFFICULTY_LEVEL.LOW,

    status: TASK_STATUS.COMPLETED,
    progress: 100,

    assignedTo: [{ id: "u5", name: "Prakash" }],
    assignedBy: { id: "u0", name: "Tech Lead" },

    attachments: [],
    comments: [],
    activity: [],

    startDate: new Date("2026-04-01"),
    dueDate: new Date("2026-04-05"),
    completedAt: new Date("2026-04-05"),

    createdAt: new Date("2026-03-30"),
    updatedAt: new Date("2026-04-05"),
  },

  // --- Remaining tasks (shorter but still realistic) ---

  {
    id: "task_006",
    title: "Image Upload Optimization",
    description: "Compress images before upload.",
    tags: ["frontend", "performance"],
    priority: TASK_PRIORITY.MEDIUM,
    difficultyLevel: DIFFICULTY_LEVEL.MEDIUM,
    status: TASK_STATUS.ON_HOLD,
    progress: 20,
    assignedTo: [{ id: "u6", name: "Anisha" }],
    assignedBy: { id: "u0", name: "Tech Lead" },
    attachments: [],
    comments: [],
    activity: [],
    createdAt: new Date(),
    updatedAt: new Date(),
  },

  {
    id: "task_007",
    title: "Notification System",
    description: "Implement real-time notifications.",
    tags: ["backend", "realtime"],
    priority: TASK_PRIORITY.HIGH,
    difficultyLevel: DIFFICULTY_LEVEL.HIGH,
    status: TASK_STATUS.IN_PROGRESS,
    progress: 0,
    assignedTo: [],
    assignedBy: { id: "u0", name: "Tech Lead" },
    attachments: [],
    comments: [],
    activity: [],
    createdAt: new Date(),
    updatedAt: new Date(),
  },

  {
    id: "task_008",
    title: "Search & Filtering",
    description: "Add filters for tasks.",
    tags: ["frontend"],
    priority: TASK_PRIORITY.MEDIUM,
    difficultyLevel: DIFFICULTY_LEVEL.MEDIUM,
    status: TASK_STATUS.IN_PROGRESS,
    progress: 50,
    assignedTo: [{ id: "u1", name: "Ujen Basi" }],
    assignedBy: { id: "u0", name: "Tech Lead" },
    attachments: [],
    comments: [],
    activity: [],
    createdAt: new Date(),
    updatedAt: new Date(),
  },

  {
    id: "task_009",
    title: "Dark Mode Support",
    description: "Add dark theme support.",
    tags: ["ui"],
    priority: TASK_PRIORITY.LOW,
    difficultyLevel: DIFFICULTY_LEVEL.LOW,
    status: TASK_STATUS.IN_PROGRESS,
    progress: 0,
    assignedTo: [{ id: "u3", name: "Ritika" }],
    assignedBy: { id: "u0", name: "Tech Lead" },
    attachments: [],
    comments: [],
    activity: [],
    createdAt: new Date(),
    updatedAt: new Date(),
  },

  {
    id: "task_010",
    title: "User Profile Page",
    description: "Create profile UI.",
    tags: ["frontend"],
    priority: TASK_PRIORITY.MEDIUM,
    difficultyLevel: DIFFICULTY_LEVEL.MEDIUM,
    status: TASK_STATUS.IN_PROGRESS,
    progress: 70,
    assignedTo: [{ id: "u3", name: "Ritika" }],
    assignedBy: { id: "u0", name: "Tech Lead" },
    attachments: [],
    comments: [],
    activity: [],
    createdAt: new Date(),
    updatedAt: new Date(),
  },

  {
    id: "task_011",
    title: "Role-based Access Control",
    description: "Implement RBAC system.",
    tags: ["backend", "security"],
    priority: TASK_PRIORITY.HIGH,
    difficultyLevel: DIFFICULTY_LEVEL.HIGH,
    status: TASK_STATUS.IN_PROGRESS,
    progress: 0,
    assignedTo: [],
    assignedBy: { id: "u0", name: "Tech Lead" },
    attachments: [],
    comments: [],
    activity: [],
    createdAt: new Date(),
    updatedAt: new Date(),
  },

  {
    id: "task_012",
    title: "Task Activity Feed",
    description: "Display task activity logs.",
    tags: ["frontend"],
    priority: TASK_PRIORITY.MEDIUM,
    difficultyLevel: DIFFICULTY_LEVEL.MEDIUM,
    status: TASK_STATUS.IN_PROGRESS,
    progress: 0,
    assignedTo: [{ id: "u1", name: "Ujen Basi" }],
    assignedBy: { id: "u0", name: "Tech Lead" },
    attachments: [],
    comments: [],
    activity: [],
    createdAt: new Date(),
    updatedAt: new Date(),
  },

  {
    id: "task_013",
    title: "File Upload Service",
    description: "Integrate Cloudinary.",
    tags: ["backend"],
    priority: TASK_PRIORITY.HIGH,
    difficultyLevel: DIFFICULTY_LEVEL.MEDIUM,
    status: TASK_STATUS.IN_PROGRESS,
    progress: 30,
    assignedTo: [{ id: "u4", name: "Nischal" }],
    assignedBy: { id: "u0", name: "Tech Lead" },
    attachments: [],
    comments: [],
    activity: [],
    createdAt: new Date(),
    updatedAt: new Date(),
  },

  {
    id: "task_014",
    title: "Error Logging System",
    description: "Setup centralized logging.",
    tags: ["infra"],
    priority: TASK_PRIORITY.HIGH,
    difficultyLevel: DIFFICULTY_LEVEL.MEDIUM,
    status: TASK_STATUS.IN_PROGRESS,
    progress: 0,
    assignedTo: [],
    assignedBy: { id: "u0", name: "Tech Lead" },
    attachments: [],
    comments: [],
    activity: [],
    createdAt: new Date(),
    updatedAt: new Date(),
  },

  {
    id: "task_015",
    title: "Performance Monitoring",
    description: "Integrate PostHog metrics.",
    tags: ["analytics"],
    priority: TASK_PRIORITY.MEDIUM,
    difficultyLevel: DIFFICULTY_LEVEL.MEDIUM,
    status: TASK_STATUS.IN_PROGRESS,
    progress: 0,
    assignedTo: [],
    assignedBy: { id: "u0", name: "Tech Lead" },
    attachments: [],
    comments: [],
    activity: [],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];
