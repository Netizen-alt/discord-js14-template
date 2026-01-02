import {
	ColorText,
	ColorType
} from './color';
import fs from 'fs';
import path from 'path';

class Logger {
	private readonly _name: string
	private readonly _logDir: string
	private readonly _logToFile: boolean

	constructor(name: string, logToFile: boolean = true){
		this._name = name;
		this._logToFile = logToFile;
		
		// ตรวจสอบว่าทำงานจาก executable หรือไม่
		const isExecutable = (process as any).pkg !== undefined;
		
		if (isExecutable) {
			// ถ้าเป็น executable ให้สร้าง logs ข้างๆ ไฟล์ exe
			this._logDir = path.join(path.dirname(process.execPath), 'logs');
		} else {
			// ถ้าเป็น development ให้สร้างใน project folder
			this._logDir = path.join(process.cwd(), 'logs');
		}
		
		// สร้างโฟลเดอร์ logs หากยังไม่มี
		if (this._logToFile && !fs.existsSync(this._logDir)) {
			fs.mkdirSync(this._logDir, { recursive: true });
		}
	}
		
	debug(...message: string[]){
		const logMessage = this.getFormat("DEBUG");
		const colorMessage = this.createMessage(ColorText.DEBUG, message);
		console.debug(logMessage, colorMessage);
		this.writeToFile("DEBUG", message.join(" "));
	}

	success(...message: string[]){
		const logMessage = this.getFormat("SUCCESS");
		const colorMessage = this.createMessage(ColorText.SUCCESS, message);
		console.log(logMessage, colorMessage);
		this.writeToFile("SUCCESS", message.join(" "));
	}

	info(...message: string[]){
		const logMessage = this.getFormat("INFO");
		const colorMessage = this.createMessage(ColorText.INFO, message);
		console.info(logMessage, colorMessage);
		this.writeToFile("INFO", message.join(" "));
	}

	warn(...message: string[]){
		const logMessage = this.getFormat("WARN");
		const colorMessage = this.createMessage(ColorText.WARN, message);
		console.warn(logMessage, colorMessage);
		this.writeToFile("WARN", message.join(" "));
	}
	
	error(...message: string[]){
		const logMessage = this.getFormat("ERROR");
		const colorMessage = this.createMessage(ColorText.ERROR, message);
		console.error(logMessage, colorMessage);
		this.writeToFile("ERROR", message.join(" "));
	}

	private getFormat(log_type: ColorType = "DEBUG"){
		return `${this.createBox(new Date().toLocaleString())} ${this.createBox(process.pid.toString())} ${this.createBox(this._name)} ${this.createBox(log_type, ColorText[log_type])}`
	}

	private createMessage(color: ColorText, message: string[]){
		return `${color}${message.join(" ")}${ColorText.RESET}`
	}

	private createBox(value: string, color: string = "\x1b[32m"){
		return `\x1b[1;30m[${color}${value}\x1b[1;30m]\x1b[0m`
	}

	private writeToFile(level: string, message: string) {
		if (!this._logToFile) return;

		const now = new Date();
		const dateStr = now.toISOString().split('T')[0]; // YYYY-MM-DD
		const timeStr = now.toLocaleString('th-TH', { 
			timeZone: 'Asia/Bangkok',
			year: 'numeric',
			month: '2-digit', 
			day: '2-digit',
			hour: '2-digit',
			minute: '2-digit',
			second: '2-digit'
		});

		// สร้างชื่อไฟล์ตามวันที่และ level
		const logFileName = `${dateStr}-${level.toLowerCase()}.log`;
		const logFilePath = path.join(this._logDir, logFileName);

		// สร้างข้อความ log แบบไม่มีสี
		const logEntry = `[${timeStr}] [${process.pid}] [${this._name}] [${level}] ${message}\n`;

		try {
			fs.appendFileSync(logFilePath, logEntry, 'utf8');
		} catch (error) {
			console.error('Failed to write to log file:', error);
		}
	}

	// Method สำหรับบันทึก activity เฉพาะ
	activity(action: string, details?: any) {
		const message = details ? `${action}: ${JSON.stringify(details)}` : action;
		this.info(`[ACTIVITY] ${message}`);
		
		// เขียนลง activity log แยกต่างหาก
		if (this._logToFile) {
			const now = new Date();
			const dateStr = now.toISOString().split('T')[0];
			const timeStr = now.toLocaleString('th-TH', { 
				timeZone: 'Asia/Bangkok',
				year: 'numeric',
				month: '2-digit', 
				day: '2-digit',
				hour: '2-digit',
				minute: '2-digit',
				second: '2-digit'
			});

			const activityLogFileName = `${dateStr}-activity.log`;
			const activityLogFilePath = path.join(this._logDir, activityLogFileName);
			const logEntry = `[${timeStr}] [${this._name}] ${message}\n`;

			try {
				fs.appendFileSync(activityLogFilePath, logEntry, 'utf8');
			} catch (error) {
				console.error('Failed to write to activity log file:', error);
			}
		}
	}

	// Method สำหรับบันทึก login/logout
	login(username: string, discriminator: string, guildCount: number) {
		const message = `Bot logged in: ${username}#${discriminator} | Guilds: ${guildCount}`;
		this.success(message);
		
		if (this._logToFile) {
			const now = new Date();
			const dateStr = now.toISOString().split('T')[0];
			const timeStr = now.toLocaleString('th-TH', { 
				timeZone: 'Asia/Bangkok',
				year: 'numeric',
				month: '2-digit', 
				day: '2-digit',
				hour: '2-digit',
				minute: '2-digit',
				second: '2-digit'
			});

			const loginLogFileName = `${dateStr}-login.log`;
			const loginLogFilePath = path.join(this._logDir, loginLogFileName);
			const logEntry = `[${timeStr}] LOGIN: ${username}#${discriminator} | Guilds: ${guildCount}\n`;

			try {
				fs.appendFileSync(loginLogFilePath, logEntry, 'utf8');
			} catch (error) {
				console.error('Failed to write to login log file:', error);
			}
		}
	}
}

export default Logger;