# PlayBack - An iPod mp3 player

## Description
Music is one of the biggest parts of my life. I listen to music when I do my chores, study, paint, and take my dog on a walk. I tend to buy a lot of CDs and download the songs onto my phone or computer to play when I have no internet. Recently, I also started listening to my songs directly from the downloaded form because of the countless ads Spotify and other music platforms play just when I start enjoying my songs and I got kinda sick of it. So I thought to myself, "I can code. Why not make a website that plays all my downloaded songs like a music player would? Nothing's stopping me." 
And that's exactly what I did. 
I brainstormed a lot and came up with the idea to make the website look like an iPod because I've been wanting one from a long time but never actually bought one. I was also learning React so I used whatever I knew to create a base and started learning more through tutorials and kept upgrading this app. By far, I think this is one of the best apps I have made and I'm really proud of it. 
This app has almost all the features an actual iPod would have. THey are listed below. 

## Features
- Upload songs
    - upload single songs in Library tab
- Upload Playlists
    - if on a computer, you can upload a playlist as an entire file with the playlist name as the file name
    - if on a phone, you can choose multiple songs to upload into a playlist and will be prompted with a text box to enter plaaylist name
- Play songs from common library and separately in each playlist
- Next Song
- Previous Song
- Move to different parts of the song - use the circle scroll wheel to rotate and move forward and backward in each song
- Dark Mode toggle
- Shuffle Songs toggle
- Login using Google
- Log out
- App and Ipod customizations:
    - App background (App Theme)
    - Ipod Screen Background (Ipod Background)
    - Font types - click on the menu to click through different fonts
    - Font color
    - Accent color
    - iPod color
- Reset Settings
- Click on buttons on the screen to navigate (or)
- Use the scroll wheel and move your finger around the circle to scroll through options
- Use the top button on the clickwheel to go back to previous screen
- You can use the app with or without logging in
- If you dont login with an account, your playlist and songs will not persist and you will have to upload them every time you want to listen

## Technologies Used
- React (.jsx)
- Vite
- HTML
- CSS
- JavaScript
- Supabase - Postgres
- Supabase auth - Google OAuth
- jsmediatags

## Limitations
- No delete implemented for songs and playlists for now
- No volume controls
- App doesnt detect duplicate songs

## Future plans
- add delete feature
- detect duplicate songs
- add volume controls
- add more customization options like stickers and charms
