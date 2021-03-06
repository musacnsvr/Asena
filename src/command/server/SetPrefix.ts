import Command from '../Command';
import SuperClient from '../../SuperClient';
import { Message } from 'discord.js';
import Server from '../../structures/Server';

export default class SetPrefix extends Command{

    constructor(){
        super({
            name: 'setprefix',
            aliases: ['prefixdeğiştir'],
            description: 'Botun komut prefix \'ini değiştirir.',
            usage: '[prefix]',
            permission: 'ADMINISTRATOR'
        });
    }

    async run(client: SuperClient, server: Server, message: Message, args: string[]): Promise<boolean>{
        const prefix = args[0]
        if(!prefix) return false

        if(prefix.length > 5){
            await message.channel.send({
                embed: this.getErrorEmbed('Komut prefix \'i en fazla 5 karakterden oluşabilir.')
            })

            return true
        }

        await server.setPrefix(prefix)

        await message.channel.send(`:comet: Komut ön adı **${prefix}** olarak değiştirildi.`)

        return true
    }

}
