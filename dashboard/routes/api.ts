/**
 * Module dependencies.
 */
import { Router } from "express";
import { EPrintType } from "@enums";
import parseDur from "@utils/parseDur";
import LogToFile from "@classes/LogToFile";
import { ICommandFile } from "@interfaces";
import { version, Guild, User } from "discord.js";

/*
 * Initialize router.
 */
const router = Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  const client = req.app.get("client");

  res.status(200).send({
    status: "success",
    message: "Welcome to the API!",
    data: {
      discord: `v${version}`,
      node: process.version,
      title: client.config.web.name,
      events: client.events
    },
  });
});

/* GET commands page. */
router.get("/command", function (req, res, next) {
  const client = req.app.get("client");

  res.status(200).send({
    status: "success",
    message: `We have ${client.mcommands.size} commands!`,
    data: client.mcommands.map((command: ICommandFile) => command.name)
  });
});

/* GET command page. */
router.get("/command/:command", function (req, res, next) {
  const client = req.app.get("client");
  const command = client.mcommands.get(req.params.command);

  if (!command) res.status(404).send({
    status: "error",
    message: `Command ${req.params.command} not found!`
  });
  else res.status(200).send({
    status: "success",
    message: `Command ${req.params.command} found!`,
    data: {
      name: command.name,
      description: command.description,
      category: command.category,
      cooldown: command.cooldown
    }
  });
});

/* GET slashs page. */
router.get("/slash", function (req, res, next) {
  const client = req.app.get("client");

  res.status(200).send({
    status: "success",
    message: `We have ${client.scommands.size} slash commands!`,
    data: client.scommands.map((command: ICommandFile) => command.name)
  });
});

/* GET slash page. */
router.get("/slash/:command", function (req, res, next) {
  const client = req.app.get("client");
  const command = client.scommands.get(req.params.command);

  if (!command) res.status(404).send({
    status: "error",
    message: `Command ${req.params.command} not found!`
  });
  else res.status(200).send({
    status: "success",
    message: `Command ${req.params.command} found!`,
    data: {
      name: command.name,
      description: command.description,
      category: command.category,
      options: command.options[0]
    }
  });
});

/* GET guild page. */
router.get("/guilds", function (req, res, next) {
  const client = req.app.get("client");

  res.status(200).send({
    status: "success",
    message: `We are now in ${client.guilds.cache.size} guilds!`,
    data: client.guilds.cache.map((guild: Guild) => guild.name)
  });
});

/* GET user page. */
router.get("/users", function (req, res, next) {
  const client = req.app.get("client");

  res.status(200).send({
    status: "success",
    message: `We are now in ${client.users.cache.size} users!`,
    data: client.users.cache.map((user: User) => user.username)
  });
});

/* GET channel page. */
router.get("/channels", function (req, res, next) {
  const client = req.app.get("client");

  res.status(200).send({
    status: "success",
    message: `We are now in ${client.channels.cache.size} channels!`,
    data: client.channels.cache.map((channel: Guild) => channel.name)
  });
});

/* GET ping page. */
router.get("/ping", function (req, res, next) {
  const client = req.app.get("client");

  res.status(200).send({
    status: "success",
    message: `Pong! ${client.ws.ping}ms`
  });
});

/* GET uptime page. */
router.get("/uptime", function (req, res, next) {
  const client = req.app.get("client");
  const uptime = parseDur(client.uptime);

  res.status(200).send({
    status: "success",
    message: `Uptime: ${uptime}`
  });
});

/* GET invite page. */
router.get("/invite", function (req, res, next) {
  const client = req.app.get("client");

  res.status(200).send({
    status: "success",
    message: `Invite me to your server!`,
    data: {
      invite: `https://discord.com/oauth2/authorize?client_id=${client.user.id}&scope=bot&permissions=8`
    }
  });
});

/* GET github page. */
router.get("/github", function (req, res, next) {
  res.status(200).send({
    status: "success",
    message: `Check out our github!`,
    data: {
      github: `https://github.com/sleepy4k/discordjs-nakaaa-ts`
    }
  });
});

/* GET log page. */
router.get("/log", function (req, res, next) {
  res.status(200).send({
    status: "success",
    message: `Check out our log!`,
    data: {
      log: {
        error: `${req.protocol}://${req.get("host")}/api/log/error`,
        warn: `${req.protocol}://${req.get("host")}/api/log/warn`,
        debug: `${req.protocol}://${req.get("host")}/api/log/debug`,
        info: `${req.protocol}://${req.get("host")}/api/log/info`,
        default: `${req.protocol}://${req.get("host")}/api/log/default`
      }
    }
  });
});

/* GET log type page. */
router.get("/log/:type", function (req, res, next) {
  let type;

  switch (req.params.type) {
    case "error":
      type = EPrintType.ERROR;
      break;
    case "warn":
      type = EPrintType.WARN;
      break;
    case "debug":
      type = EPrintType.DEBUG;
      break;
    case "info":
      type = EPrintType.INFO;
      break;
    default:
      type = EPrintType.DEFAULT;
      break;
  }

  const logPath = LogToFile.read(type);

  res.status(200).send({
    status: "success",
    message: `Log ${type} found!`,
    data: {
      log: logPath
    }
  });
});

/* GET log date page. */
router.get("/log/:type/:date", function (req, res, next) {
  let type;

  switch (req.params.type) {
    case "error":
      type = EPrintType.ERROR;
      break;
    case "warn":
      type = EPrintType.WARN;
      break;
    case "debug":
      type = EPrintType.DEBUG;
      break;
    case "info":
      type = EPrintType.INFO;
      break;
    default:
      type = EPrintType.DEFAULT;
      break;
  }

  const logPath = LogToFile.read(type, req.params.date);

  if (!logPath) return res.status(404).send({
    status: "error",
    message: `Log ${type} not found!`
  });

  res.status(200).send({
    status: "success",
    message: `Log ${type} found!`,
    data: {
      log: logPath
    }
  });
});

export default router;
