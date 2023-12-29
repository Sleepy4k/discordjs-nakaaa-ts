/**
 * Coding service by Sleepy4k <sarahpalastring@gmail.com>
 *
 * Reselling this file, via any medium is strictly prohibited
 * Proprietary and confidential
 *
 * Written by:
 * Apri Pandu Wicaksono
 *
 * Link: https://github.com/sleepy4k
 *
 * March 12, 2023
 */
import { Bot } from "./bot";
import { axios } from "@services";
import { ELogStatus } from "@enums";
import CatchError from "@classes/CatchError";
import * as packageJson from "../../package.json";

const checkUpdate = async (client: Bot) => {
  const { version, repository } = packageJson;
  const { url } = repository;

  const currentVersion = "v" + version;
  const github = url.replace(".git", "").replace("git+https://github.com/", "https://api.github.com/repos/");

  await axios(github).get("/releases/latest").then((res) => {
    const { name, tag_name } = res.data;

    if (name !== currentVersion || tag_name !== currentVersion) return client.logStatus("Availabel", "Update Status", ELogStatus.ERROR)
    else return client.logStatus("Up to date", "Update Status", ELogStatus.SUCCESS)
  }).catch((error: unknown) => CatchError.print(error));
}

export default checkUpdate;
