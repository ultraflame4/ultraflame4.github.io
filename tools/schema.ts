import path from "path";
import * as TJS from "typescript-json-schema";
import * as fs from "fs";

// optionally pass argument to schema generator
const settings: TJS.PartialArgs = {
    required: true,
    ignoreErrors: true,
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
    [path.resolve("./src/lib/projects_data.ts")],
    compilerOptions,
);

function writeSchema(typename: string, filename: string) {
    const schema = TJS.generateSchema(program, typename, settings);
    fs.writeFileSync(
        path.resolve("data/projects/" + filename),
        JSON.stringify(schema, undefined, 3),
    );
}

writeSchema("FrontmatterProjectDataSchema", "schema.json");
// const schema_proj = TJS.generateSchema(program, "FrontmatterProjectDataSchema", settings)
