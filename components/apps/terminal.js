import React, { Component } from 'react'
import $ from 'jquery';
import ReactGA from 'react-ga4';

export class Terminal extends Component {
    constructor() {
        super();
        this.cursor = "";
        this.terminal_rows = 1;
        this.current_directory = "~";
        this.curr_dir_name = "root";
        this.prev_commands = [];
        this.commands_index = -1;
        this.clipboard = '';  // Add this line
        this.child_directories = {
            root: ["projects", "personal-documents", "skills", "languages", "interests"],
            skills: ["Front-End Development", "Back-End Development", "AWS", "React", "Redux", "TypeScript", "Rust"],
            projects: ["Autonomous Vehicle Simulation", "Hashword CLI & Web Application", "Custom-Themed Web Application", "Code2Image", "3D SHM Visualization"],
            interests: ["Machine Learning", "Web Development", "Cybersecurity", "Cloud Computing"],
            languages: ["Rust", "Python", "R", "JavaScript", "HTML", "CSS", "C"],
        };
        this.state = {
            terminal: [],
        }
    }

    componentDidMount() {
        this.reStartTerminal();
    }

    componentDidUpdate() {
        clearInterval(this.cursor);
        this.startCursor(this.terminal_rows - 2);
    }

    componentWillUnmount() {
        clearInterval(this.cursor);
    }

    reStartTerminal = () => {
        clearInterval(this.cursor);
        $('#terminal-body').empty();
        
        const welcomeMessage = `
            <div class="my-4 font-mono">
                <span class="text-lime-500 font-bold">┌──[</span><span class="text-fuchsia-500">ranjan㉿kali</span><span class="text-lime-500">]</span>
                <br/>
                <span class="text-lime-500 font-bold">└──╼</span> <span class="text-sky-400">Welcome to Ranjan's Terminal v1.0</span>
                <br/>
                <span class="text-gray-400">Type '<span class="text-yellow-400">help</span>' to see list of available commands</span>
                <br/><br/>
                <span class="text-sky-400 font-bold">Directory Structure:</span>
                <span class="text-gray-100">
                • root
                  ├── projects
                  ├── skills
                  ├── languages
                  └── interests
                </span>
            </div>
        `;
        $('#terminal-body').append(welcomeMessage);
        
        this.appendTerminalRow();
    }

    appendTerminalRow = () => {
        let terminal = this.state.terminal;
        terminal.push(this.terminalRow(this.terminal_rows));
        this.setState({ terminal });
        this.terminal_rows += 2;
    }

    terminalRow = (id) => {
        return (
            <React.Fragment key={id}>
                <div className="flex w-full">
                    <div className="flex cursor-pointer" onClick={() => this.handleCopy(`ranjan@kali:${this.current_directory}$ `)}>
                        <div className="text-lime-500">ranjan</div>
                        <div className="text-white">@</div>
                        <div className="text-fuchsia-500">kali</div>
                        <div className="text-white">:</div>
                        <div className="text-sky-400">{this.current_directory}</div>
                        <div className="text-white mr-1">$</div>
                    </div>
                    <div id="cmd" onClick={this.focusCursor} className="bg-transparent relative flex-1 overflow-hidden">
                        <span id={`show-${id}`} className="float-left whitespace-pre pb-1 opacity-100 font-mono text-gray-100"></span>
                        <div id={`cursor-${id}`} className="float-left mt-1 w-1.5 h-4 bg-gray-100 animate-blink"></div>
                        <input 
                            id={`terminal-input-${id}`} 
                            data-row-id={id} 
                            onKeyDown={this.checkKey} 
                            onBlur={this.unFocusCursor} 
                            className="absolute top-0 left-0 w-full opacity-0 outline-none bg-transparent font-mono" 
                            spellCheck={false} 
                            autoFocus={true} 
                            autoComplete="off" 
                            type="text" 
                        />
                    </div>
                </div>
                <div 
                    id={`row-result-${id}`} 
                    className="my-2 font-mono text-gray-100 cursor-pointer select-text"
                    onClick={(e) => this.handleCopy(e.target.innerText)}
                ></div>
            </React.Fragment>
        );

    }

    focusCursor = (e) => {
        clearInterval(this.cursor);
        this.startCursor($(e.target).data("row-id"));
    }

    unFocusCursor = (e) => {
        this.stopCursor($(e.target).data("row-id"));
    }

    startCursor = (id) => {
        clearInterval(this.cursor);
        $(`input#terminal-input-${id}`).trigger("focus");
        // On input change, set current text in span
        $(`input#terminal-input-${id}`).on("input", function () {
            $(`#cmd span#show-${id}`).text($(this).val());
        });
        this.cursor = window.setInterval(function () {
            if ($(`#cursor-${id}`).css('visibility') === 'visible') {
                $(`#cursor-${id}`).css({ visibility: 'hidden' });
            } else {
                $(`#cursor-${id}`).css({ visibility: 'visible' });
            }
        }, 500);
    }

    stopCursor = (id) => {
        clearInterval(this.cursor);
        $(`#cursor-${id}`).css({ visibility: 'visible' });
    }

    removeCursor = (id) => {
        this.stopCursor(id);
        $(`#cursor-${id}`).css({ display: 'none' });
    }

    clearInput = (id) => {
        $(`input#terminal-input-${id}`).trigger("blur");
    }

    checkKey = (e) => {
        if (e.key === "Enter") {
            let terminal_row_id = $(e.target).data("row-id");
            let command = $(`input#terminal-input-${terminal_row_id}`).val().trim();
            if (command.length !== 0) {
                this.removeCursor(terminal_row_id);
                this.handleCommands(command, terminal_row_id);
            }
            else return;
            // push to history
            this.prev_commands.push(command);
            this.commands_index = this.prev_commands.length - 1;

            this.clearInput(terminal_row_id);
        }
        else if (e.key === "ArrowUp") {
            let prev_command;

            if (this.commands_index <= -1) prev_command = "";
            else prev_command = this.prev_commands[this.commands_index];

            let terminal_row_id = $(e.target).data("row-id");

            $(`input#terminal-input-${terminal_row_id}`).val(prev_command);
            $(`#show-${terminal_row_id}`).text(prev_command);

            this.commands_index--;
        }
        else if (e.key === "ArrowDown") {
            let prev_command;

            if (this.commands_index >= this.prev_commands.length) return;
            if (this.commands_index <= -1) this.commands_index = 0;

            if (this.commands_index === this.prev_commands.length) prev_command = "";
            else prev_command = this.prev_commands[this.commands_index];

            let terminal_row_id = $(e.target).data("row-id");

            $(`input#terminal-input-${terminal_row_id}`).val(prev_command);
            $(`#show-${terminal_row_id}`).text(prev_command);

            this.commands_index++;
        }
    }

    childDirectories = (parent) => {
        let files = [];
        files.push(`<div class="flex justify-start flex-wrap">`)
        this.child_directories[parent].forEach(file => {
            files.push(
                `<span class="font-bold mr-2 text-ubt-blue">'${file}'</span>`
            )
        });
        files.push(`</div>`)
        return files;
    }

    closeTerminal = () => {
        $("#close-terminal").trigger('click');
    }

    handleCommands = (command, rowId) => {
        let words = command.split(' ').filter(Boolean);
        let main = words[0];
        words.shift()
        let result = "";
        let rest = words.join(" ");
        rest = rest.trim();
        switch (main) {
            case "cd":
                if (words.length === 0 || rest === "") {
                    this.current_directory = "~";
                    this.curr_dir_name = "root"
                    break;
                }
                if (words.length > 1) {
                    result = "too many arguments, arguments must be <1.";
                    break;
                }

                if (rest === "personal-documents") {
                    result = `bash /${this.curr_dir_name} : Permission denied 😏`;
                    break;
                }

                if (this.child_directories[this.curr_dir_name].includes(rest)) {
                    this.current_directory += "/" + rest;
                    this.curr_dir_name = rest;
                }
                else if (rest === "." || rest === ".." || rest === "../") {
                    result = "Type only 'cd'😉 to go back";
                    break;
                }
                else {
                    result = `bash: cd: ${words}: No such file or directory`;
                }
                break;
            case "ls":
                let target = words[0];
                if (target === "" || target === undefined || target === null) target = this.curr_dir_name;

                if (words.length > 1) {
                    result = "too many arguments, arguments must be <1.";
                    break;
                }
                if (target in this.child_directories) {
                    result = this.childDirectories(target).join("");
                }
                else if (target === "personal-documents") {
                    result = "Nope! 🙃";
                    break;
                }
                else {
                    result = `ls: cannot access '${words}': No such file or directory                    `;
                }
                break;
            case "mkdir":
                if (words[0] !== undefined && words[0] !== "") {
                    this.props.addFolder(words[0]);
                    result = "";
                } else {
                    result = "mkdir: missing operand";
                }
                break;
            case "pwd":
                let str = this.current_directory;
                result = str.replace("~", "/home/ranjan")
                break;
            case "code":
                if (words[0] === "." || words.length === 0) {
                    this.props.openApp("vscode");
                } else {
                    result = "Command '" + main + "' not found, or not yet implemented.<br>Available Commands:[ cd, ls, pwd, echo, clear, exit, mkdir, code, spotify, chrome, about-ranjan, todoist, trash, settings, sendmsg]";
                }
                break;
            case "echo":
                result = this.xss(words.join(" "));
                break;
            case "spotify":
                if (words[0] === "." || words.length === 0) {
                    this.props.openApp("spotify");
                } else {
                    result = "Command '" + main + "' not found, or not yet implemented.<br>Available Commands: [ cd, ls, pwd, echo, clear, exit, mkdir, code, spotify, chrome, about-ranjan, todoist, trash, settings, sendmsg ]";
                }
                break;
            case "chrome":
                if (words[0] === "." || words.length === 0) {
                    this.props.openApp("chrome");
                } else {
                    result = "Command '" + main + "' not found, or not yet implemented.<br>Available Commands: [ cd, ls, pwd, echo, clear, exit, mkdir, code, spotify, chrome, about-ranjan, todoist, trash, settings, sendmsg ]";
                }
                break;
            case "todoist":
                if (words[0] === "." || words.length === 0) {
                    this.props.openApp("todo-ist");  // Matches the app name in the parent component
                } else {
                    result = "Command '" + main + "' not found. Type 'help' to see available commands.";
                }
                break;
            case "trash":
                if (words[0] === "." || words.length === 0) {
                    this.props.openApp("trash");
                } else {
                    result = "Command '" + main + "' not found, or not yet implemented.<br>Available Commands: [ cd, ls, pwd, echo, clear, exit, mkdir, code, spotify, chrome, about-ranjan, todoist, trash, settings, sendmsg ]";
                }
                break;
            case "about-ranjan":
                if (words[0] === "." || words.length === 0) {
                    this.props.openApp("about-ranjan");  // Matches the app name in the parent component
                } else {
                    result = "Command '" + main + "' not found. Type 'help' to see available commands.";
                }
                break;
            case "terminal":
                if (words[0] === "." || words.length === 0) {
                    this.props.openApp("terminal");
                } else {
                    result = "Command '" + main + "' not found, or not yet implemented.<br>Available Commands: [ cd, ls, pwd, echo, clear, exit, mkdir, code, spotify, chrome, about-ranjan, todoist, trash, settings, sendmsg ]";
                }
                break;
            case "settings":
                if (words[0] === "." || words.length === 0) {
                    this.props.openApp("settings");
                } else {
                    result = "Command '" + main + "' not found, or not yet implemented.<br>Available Commands: [ cd, ls, pwd, echo, clear, exit, mkdir, code, spotify, chrome, about-ranjan, todoist, trash, settings, sendmsg ]";
                }
                break;
            case "sendmsg":
                if (words[0] === "." || words.length === 0) {
                    this.props.openApp("gedit");
                } else {
                    result = "Command '" + main + "' not found, or not yet implemented.<br>Available Commands: [ cd, ls, pwd, echo, clear, exit, mkdir, code, spotify, chrome, about-ranjan, todoist, trash, settings, sendmsg ]";
                }
                break;
            case "clear":
                this.reStartTerminal();
                return;
            case "exit":
                this.closeTerminal();
                return;
            case "sudo":

                ReactGA.event({
                    category: "Sudo Access",
                    action: "lol",
                });

                result = "<img class=' w-2/5' src='./images/memes/used-sudo-command.webp' />";
                break;
            case "help":
                result = `
                    <div class="my-2 font-normal">
                        <div class="mb-4">
                            <h3 class="text-ubt-blue font-bold text-xl mb-2">📚 Terminal Help</h3>
                            <p class="mb-2">Welcome to Ranjan's Terminal. Here are all available commands:</p>
                        </div>

                        <div class="grid grid-cols-1 gap-4">
                            <div class="mb-2">
                                <div class="text-ubt-blue font-bold mb-1">🧭 Navigation</div>
                                <div class="pl-3 border-l-2 border-ubt-blue">
                                    <div><span class="text-white">cd [dir]</span> - Change directory</div>
                                    <div><span class="text-white">ls [dir]</span> - List directory contents</div>
                                    <div><span class="text-white">pwd</span> - Print working directory</div>
                                </div>
                            </div>

                            <div class="mb-2">
                                <div class="text-ubt-blue font-bold mb-1">🖥️ Applications</div>
                                <div class="pl-3 border-l-2 border-ubt-blue">
                                    <div><span class="text-white">code</span> - Open VS Code</div>
                                    <div><span class="text-white">chrome</span> - Open Chrome</div>
                                    <div><span class="text-white">spotify</span> - Open Spotify</div>
                                    <div><span class="text-white">about-ranjan</span> - View About Me</div>
                                    <div><span class="text-white">todoist</span> - Open Todo List</div>
                                    <div><span class="text-white">settings</span> - Open Settings</div>
                                    <div><span class="text-white">sendmsg</span> - Send Message</div>
                                </div>
                            </div>

                            <div class="mb-2">
                                <div class="text-ubt-blue font-bold mb-1">⚙️ System Commands</div>
                                <div class="pl-3 border-l-2 border-ubt-blue">
                                    <div><span class="text-white">clear</span> - Clear terminal</div>
                                    <div><span class="text-white">echo [text]</span> - Print text</div>
                                    <div><span class="text-white">exit</span> - Close terminal</div>
                                    <div><span class="text-white">help</span> - Show this help</div>
                                </div>
                            </div>

                            <div class="mb-2">
                                <div class="text-ubt-blue font-bold mb-1">📁 File Operations</div>
                                <div class="pl-3 border-l-2 border-ubt-blue">
                                    <div><span class="text-white">mkdir [name]</span> - Create directory</div>
                                    <div><span class="text-white">trash</span> - Open trash</div>
                                </div>
                            </div>

                            <div class="mb-2">
                                <div class="text-ubt-blue font-bold mb-1">⌨️ Keyboard Shortcuts</div>
                                <div class="pl-3 border-l-2 border-ubt-blue">
                                    <div><span class="text-white">↑/↓</span> - Navigate command history</div>
                                    <div><span class="text-white">Ctrl + C</span> - Copy selected text</div>
                                    <div><span class="text-white">Click</span> - Copy command or output</div>
                                </div>
                            </div>

                            <div class="mt-4 text-xs text-gray-400">
                                <div>💡 Tip: Click on any command output to copy it to clipboard</div>
                                <div>🔍 Type a command and press Enter to execute</div>
                            </div>
                        </div>
                    </div>
                `;
                break;
            default:
                result = "Command '" + main + "' not found. Type 'help' to see available commands.";
                break;
        }
        document.getElementById(`row-result-${rowId}`).innerHTML = result;
        this.appendTerminalRow();
    }

    handleCopy = (text) => {
        navigator.clipboard.writeText(text).then(() => {
            console.log('Text copied to clipboard');
        }).catch(err => {
            console.error('Failed to copy text: ', err);
        });
    }

    xss(str) {
        if (!str) return;
        return str.split('').map(char => {
            switch (char) {
                case '&':
                    return '&amp';
                case '<':
                    return '&lt';
                case '>':
                    return '&gt';
                case '"':
                    return '&quot';
                case "'":
                    return '&#x27';
                case '/':
                    return '&#x2F';
                default:
                    return char;
            }
        }).join('');
    }

    render() {
        return (
            <div className="h-full w-full bg-black bg-opacity-90 text-gray-100 font-mono text-sm" id="terminal-body">
                {this.state.terminal}
            </div>
        )
    }
}

export default Terminal

export const displayTerminal = (addFolder, openApp) => {
    return <Terminal addFolder={addFolder} openApp={openApp}> </Terminal>;
}
