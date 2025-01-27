import type { PlayerOptions } from "discord-music-player"

const PlayerOptionsConfig: PlayerOptions = {
  leaveOnEnd: false,
  leaveOnStop: false,
  leaveOnEmpty: false,
  deafenOnJoin: true,
  timeout: 60000,
  volume: 100,
  quality: "high",
};

export default PlayerOptionsConfig;
