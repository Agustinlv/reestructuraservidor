import dotenv from "dotenv";
import path from "path";
import { Command } from "commander";

const program = new Command();

import __dirname from "../utils.js"

program.option("-mode <mode>", "Environment Mode", "dev");

program.parse()

const environment = program.opts();

const pathEnvironment = environment.Mode === "prod" ? path.join(__dirname, "../.env.production") : path.join(__dirname, "../.env.development");

dotenv.config({path: pathEnvironment});

const PORT = process.env.PORT;

const MONGO = process.env.MONGO;

const SECRET = process.env.SECRET;

export const config = {
    server: {port: PORT},
    mongo: {url: MONGO},
    secret: {key: SECRET}
};