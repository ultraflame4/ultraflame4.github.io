import path from "path";
import * as TJS from "typescript-json-schema";
import * as fs from "fs";
import type {proj_entry} from "./src/assets/projects";

// optionally pass argument to schema generator
const settings: TJS.PartialArgs = {
    required: true,
};

// optionally pass ts compiler options
const compilerOptions: TJS.CompilerOptions = {
    strictNullChecks: true,
};

const program = TJS.getProgramFromFiles(
    [path.resolve("./src/tools/skills.ts"),path.resolve("./src/tools/projects.ts")],
    compilerOptions
);

const schema_skills = TJS.generateSchema(program, "SkillListJsonConfig", settings)
const schema_proj = TJS.generateSchema(program, "proj_entry", settings)
const json_skills = JSON.stringify(schema_skills,undefined,3)
const json_proj = JSON.stringify(schema_proj,undefined,3)

fs.writeFileSync(path.resolve("./public/schema-skills.json"), json_skills)
fs.writeFileSync(path.resolve("./public/schema-projects.json"), json_proj)
