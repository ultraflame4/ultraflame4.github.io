import path from "path";
import * as TJS from "typescript-json-schema";
import * as fs from "fs";

// optionally pass argument to schema generator
const settings: TJS.PartialArgs = {
    required: true,
    ignoreErrors: true
};

// optionally pass ts compiler options
const compilerOptions: TJS.CompilerOptions = {
    strictNullChecks: false,
    // noResolve: true,
    // module: "esnext",
    strict: false,
    skipLibCheck: true,


};

const program = TJS.getProgramFromFiles(
    [path.resolve("./src/tools/skills.ts"),path.resolve("./src/assets/projects.ts")],
    compilerOptions
);


function writeSchema(typename: string,filename: string){
    const schema = TJS.generateSchema(program,typename,settings)
    fs.writeFileSync(path.resolve("./public/"+filename),JSON.stringify(schema,undefined,3))
}

writeSchema("SkillListJsonConfig","schema-skills.json");
writeSchema("oldFormat.proj_entry","schema-projects.json");
writeSchema("FrontmatterProjectDataSchema","schema-attributes.json");
// const schema_proj = TJS.generateSchema(program, "FrontmatterProjectDataSchema", settings)
