import jsmediatags from "jsmediatags";

export function extractSongData(file) {
  return new Promise((resolve, reject) => {
    jsmediatags.read(file, {
      onSuccess: (tag) => {
        const { title, artist, album, picture } = tag.tags;

        let albumArtBlob = null;
        if (picture) {
          albumArtBlob = new Blob([new Uint8Array(picture.data)], { type: picture.format });
        }

        const audio = new Audio(URL.createObjectURL(file));
        audio.addEventListener("loadedmetadata", () => {
          resolve({
            id: crypto.randomUUID(),
            title: title || file.name,
            artist: artist || "Unknown Artist",
            album: album || "Unknown Album",
            duration: audio.duration,
            albumArtBlob: albumArtBlob,
            fileUrl: URL.createObjectURL(file),
          });
        });
      },
      onError: (error) => reject(error),
    });
  });
}