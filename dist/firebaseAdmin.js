"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.firebaseApp = void 0;
const app_1 = require("firebase-admin/app");
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
// __dirname = /...backend/src, so go one level up to /backend
const serviceAccountPath = path_1.default.resolve(__dirname, '..', 'tezsend-firebase-adminsdk.json');
let firebaseApp;
function initFirebaseAdmin() {
    const existingApps = (0, app_1.getApps)();
    // Guard against double-initialization during tsx hot-reload.
    if (existingApps.length > 0) {
        console.log('Firebase Admin: reusing already-initialized app.');
        return (0, app_1.getApp)();
    }
    let serviceAccount;
    // 1) Prefer env var (production / CI / hosting without file access)
    if (process.env.FIREBASE_SERVICE_ACCOUNT_JSON) {
        console.log('Firebase Admin: loading credentials from FIREBASE_SERVICE_ACCOUNT_JSON env var.');
        try {
            serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_JSON);
        }
        catch {
            throw new Error('Firebase Admin: FIREBASE_SERVICE_ACCOUNT_JSON is set but contains invalid JSON. ' +
                'Make sure the value is the raw contents of the service account JSON file.');
        }
    }
    // 2) Fall back to local file (local development)
    else if (fs_1.default.existsSync(serviceAccountPath)) {
        console.log(`Firebase Admin: loading credentials from file: ${serviceAccountPath}`);
        const raw = fs_1.default.readFileSync(serviceAccountPath, 'utf8');
        serviceAccount = JSON.parse(raw);
    }
    // 3) Neither source found — give a clear error
    else {
        throw new Error('Firebase Admin: no credentials found.\n' +
            '  • Production: set the FIREBASE_SERVICE_ACCOUNT_JSON environment variable to the\n' +
            '    full JSON contents of your service account key.\n' +
            `  • Local dev: place tezsend-firebase-adminsdk.json in the /backend directory.\n` +
            `  (Looked for file at: ${serviceAccountPath})`);
    }
    const app = (0, app_1.initializeApp)({ credential: (0, app_1.cert)(serviceAccount) });
    const projectId = serviceAccount.project_id ?? 'unknown';
    console.log(`Firebase Admin: initialized (project: ${projectId})`);
    return app;
}
exports.firebaseApp = firebaseApp = initFirebaseAdmin();
exports.default = firebaseApp;
