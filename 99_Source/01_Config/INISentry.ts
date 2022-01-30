import { CommandLineArgs } from './CommandLineArgs';
import { Column, LoadFile } from 'ini-inject';

@LoadFile(`05_Config/${CommandLineArgs.ini}/Sentry`)
export class INISentry {
	@Column()
	public static DSN: string;
}
