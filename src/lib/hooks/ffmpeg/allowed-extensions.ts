// TODO: Maybe we can use ffprobe here to dynamically list the allowed extensions?

const VIDEO_EXTENSIONS = [
  ".mp4",
  ".mkv",
  ".x-matroska",
  ".avi",
  ".mov",
  ".wmv",
  ".flv",
  ".webm",
  ".mpeg",
  ".m4v",
  ".3gp",
  ".ts",
];

const AUDIO_EXTENSIONS = [
  ".mp3",
  ".aac",
  ".wav",
  ".flac",
  ".ogg",
  ".wma",
  ".m4a",
  ".opus",
  ".aiff",
  ".cda",
];

const IMAGE_EXTENSIONS = [
  ".jpg",
  ".jpeg",
  ".png",
  ".gif",
  ".bmp",
  ".tiff",
  ".tif",
  ".webp",
  ".svg",
];

export const allowedExtensions = {
  video: VIDEO_EXTENSIONS,
  audio: AUDIO_EXTENSIONS,
  image: IMAGE_EXTENSIONS,
};
