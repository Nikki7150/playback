import jsmediatags from "jsmediatags";

export function extractSongData(file) {
  return new Promise((resolve, reject) => {
    jsmediatags.read(file, {
      onSuccess: (tag) => {
        const { title, artist, album, picture } = tag.tags;

        let albumArt = null;
        if (picture) {
          const base64String = picture.data
            .map((byte) => String.fromCharCode(byte))
            .join("");
          albumArt = `data:${picture.format};base64,${btoa(base64String)}`;
        }

        const audio = new Audio(URL.createObjectURL(file));
        audio.addEventListener("loadedmetadata", () => {
          resolve({
            id: crypto.randomUUID(),
            title: title || file.name,
            artist: artist || "Unknown Artist",
            album: album || "Unknown Album",
            duration: audio.duration,
            albumArt,
            fileUrl: URL.createObjectURL(file),
          });
        });
      },
      onError: (error) => reject(error),
    });
  });
}