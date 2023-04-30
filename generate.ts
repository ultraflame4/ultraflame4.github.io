import path from "path";
import * as TJS from "typescript-json-schema";
import * as fs from "fs";

// optionally pass argument to schema generator
const settings: TJS.PartialArgs = {
    required: true,
};

// optionally pass ts compiler options
const compilerOptions: TJS.CompilerOptions = {
    strictNullChecks: true,
};

const program = TJS.getProgramFromFiles(
    [path.resolve("./src/tools/skills.ts")],
    compilerOptions
);

const schema = TJS.generateSchema(program, "SkillListJsonConfig", settings)
const json_ = JSON.stringify(schema,undefined,3)
console.log(json_)
fs.writeFileSync(path.resolve("./public/schema-skills.json"), json_)
