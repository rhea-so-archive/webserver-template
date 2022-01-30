import { CommandLineArgs } from './CommandLineArgs';
import { Column, LoadFile } from 'ini-inject';

@LoadFile(`05_Config/${CommandLineArgs.ini}/Express`)
export class INIExpress {
	@Column()
	public static URL: string;

	@Column()
	public static PORT: number;
}
