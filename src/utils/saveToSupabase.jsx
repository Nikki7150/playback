import { supabase } from "./supabaseClient.js";

export const saveSongToSupabase = async (song, file, userId) => {
    const { error: audioError } = await supabase.storage
        .from("user-audio")
        .upload(`${userId}/${song.id}.mp3`, file, { upsert: true });
    if (audioError) {
        console.error("Error uploading audio:", audioError);
        return null;
    }
    const { data: audioUrlData } = supabase.storage
        .from("user-audio")
        .getPublicUrl(`${userId}/${song.id}.mp3`);
    let albumArtUrlData = null;
    if (song.albumArtBlob) {
        const { error: albumArtError } = await supabase.storage
            .from("user-images")
            .upload(`${userId}/${song.id}.jpg`, song.albumArtBlob, { upsert: true });
        if (albumArtError) {
            console.error("Error uploading album art:", albumArtError);
            return null;
        }
        const { data } = supabase.storage
            .from("user-images")
            .getPublicUrl(`${userId}/${song.id}.jpg`);
        albumArtUrlData = data;
    }
    const { error: insertError } = await supabase.from("songs").insert([
        {
            id: song.id,
            title: song.title,
            artist: song.artist,
            album: song.album,
            duration: song.duration,
            file_url: audioUrlData.publicUrl,
            album_art_url: albumArtUrlData ? albumArtUrlData.publicUrl : null,
            user_id: userId
        }
    ]);
    if (insertError) {
        console.error("Error inserting song:", insertError);
        return null;
    }
    return {
        ...song,
        fileUrl: audioUrlData.publicUrl,
        albumArt: albumArtUrlData ? albumArtUrlData.publicUrl : null
    };
};

export const savePlaylistToSupabase = async (playlist, userId) => {
    const { error: playlistError } = await supabase.from("playlists").insert([
        {
            id: playlist.id,
            name: playlist.name,
            user_id: userId
        }
    ]);
    if (playlistError) {
        console.error("Error saving playlist to Supabase:", playlistError);
        return;
    };
    const playlistSongEntries = playlist.songIds.map((songId) => ({
        playlist_id: playlist.id,
        song_id: songId
    }));
    const { error: playlistSongsError } = await supabase.from("playlist_songs").insert(playlistSongEntries);
    if (playlistSongsError) {
        console.error("Error saving playlist songs to Supabase:", playlistSongsError);
        return;
    }
    return playlist;
};