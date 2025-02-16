import displaySpotify from './components/apps/spotify';
import displayVsCode from './components/apps/vscode';
import { displayTerminal } from './components/apps/terminal';
import { displaySettings } from './components/apps/settings';
import { displayChrome } from './components/apps/chrome';
import { displayTrash } from './components/apps/trash';
import { displayGedit } from './components/apps/gedit';
import { displayAboutVivek } from './components/apps/vivek';
import { displayTerminalCalc } from './components/apps/calc';
import { displayWeather } from './components/apps/weather'; // P01fe
import { displayNotes } from './components/apps/notes'; // Pee7f
import { displayCalendar } from './components/apps/calendar'; // P6bb1
import { displayMusicPlayer } from './components/apps/musicPlayer'; // P075d
import { displayFileManager } from './components/apps/fileManager'; // P9e9f
import { displayChat } from './components/apps/chat'; // P81c4

const apps = [
    {
        id: "chrome",
        title: "Google Chrome",
        icon: './themes/Yaru/apps/chrome.png',
        disabled: false,
        favourite: true,
        desktop_shortcut: true,
        screen: displayChrome,
    },
    {
        id: "calc",
        title: "Calc",
        icon: './themes/Yaru/apps/calc-kali.png',
        disabled: false,
        favourite: true,
        desktop_shortcut: false,
        screen: displayTerminalCalc,
    },
    {
        id: "about-Ranjan",
        title: "About Ranjan",
        icon: './themes/Yaru/system/mc-home-logo.png',
        disabled: false,
        favourite: true,
        desktop_shortcut: true,
        screen: displayAboutVivek,
    },
    {
        id: "vscode",
        title: "Visual Studio Code",
        icon: './themes/Yaru/apps/vscode.png',
        disabled: false,
        favourite: true,
        desktop_shortcut: false,
        screen: displayVsCode,
    },
    {
        id: "terminal",
        title: "Terminal",
        icon: './themes/Yaru/apps/kali-terminal.png',
        disabled: false,
        favourite: true,
        desktop_shortcut: false,
        screen: displayTerminal,
    },
    {
        id: "spotify",
        title: "Spotify",
        icon: './themes/Yaru/apps/spotify.png',
        disabled: false,
        favourite: true,
        desktop_shortcut: false,
        screen: displaySpotify, // India Top 50 Playlist 😅
    },
    {
        id: "settings",
        title: "Settings",
        icon: './themes/Yaru/apps/gnome-control-center.png',
        disabled: false,
        favourite: true,
        desktop_shortcut: false,
        screen: displaySettings,
    },
    {
        id: "trash",
        title: "Trash",
        icon: './themes/Yaru/system/user-trash-full.png',
        disabled: false,
        favourite: false,
        desktop_shortcut: true,
        screen: displayTrash,
    },
    {
        id: "gedit",
        title: "Contact Me",
        icon: './themes/Yaru/apps/gedit.png',
        disabled: false,
        favourite: false,
        desktop_shortcut: true,
        screen: displayGedit,
    },
    {
        id: "weather",
        title: "Weather",
        icon: './themes/Yaru/apps/weather.png',
        disabled: false,
        favourite: true,
        desktop_shortcut: true,
        screen: displayWeather,
    },
    {
        id: "notes",
        title: "Notes",
        icon: './themes/Yaru/apps/notes.png',
        disabled: false,
        favourite: true,
        desktop_shortcut: true,
        screen: displayNotes,
    },
    {
        id: "calendar",
        title: "Calendar",
        icon: './themes/Yaru/apps/calendar.png',
        disabled: false,
        favourite: true,
        desktop_shortcut: true,
        screen: displayCalendar,
    },
    {
        id: "musicPlayer",
        title: "Music Player",
        icon: './themes/Yaru/apps/musicPlayer.png',
        disabled: false,
        favourite: true,
        desktop_shortcut: true,
        screen: displayMusicPlayer,
    },
    {
        id: "fileManager",
        title: "File Manager",
        icon: './themes/Yaru/apps/fileManager.png',
        disabled: false,
        favourite: true,
        desktop_shortcut: true,
        screen: displayFileManager,
    },
    {
        id: "chat",
        title: "Chat",
        icon: './themes/Yaru/apps/chat.png',
        disabled: false,
        favourite: true,
        desktop_shortcut: true,
        screen: displayChat,
    },
]

export default apps;
