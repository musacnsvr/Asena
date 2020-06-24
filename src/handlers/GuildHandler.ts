import Constants from '../Constants'
import { SuperClient } from '../Asena';
import Handler from './Handler';

export class GuildHandler extends Handler{

    private counter: number = 0
    private static readonly UPDATE_INTERVAL: number = 1000 * 60 * 5

    public start(): void{
        this.client.on('ready', async () => {
            const client: SuperClient = this.client

            await client.user.setStatus('online')
            await client.user.setActivity(`${Constants.CONFETTI_REACTION_EMOJI} ${this.counter} Sunucu | ${process.env.PREFIX}help\nhttps://asena.xyz`, {
                type: 'PLAYING'
            })

            client.logger.info(`Asena ${client.version.getFullVersion()} başlatılıyor...`)
            client.logger.info(`${client.user.username} aktif, toplam ${client.guilds.cache.size} sunucu ve ${client.users.cache.size} kullanıcıya hizmet veriliyor!`)
        })

        this.setGuildCounterListeners()

        this.setActivityUpdateInterval()
    }

    private setGuildCounterListeners(): void{
        const webHook = this.client.webHook
        this.client.on('ready', () => {
            this.counter = this.client.guilds.cache.size
        })

        this.client.on('guildCreate', guild => {
            this.counter += 1

            webHook.resolveGuild(guild)
        })

        this.client.on('guildDelete', guild => {
            this.counter -= 1

            webHook.resolveGuild(guild, false)
        })
    }

    private setActivityUpdateInterval(){
        setInterval(async () => {
            await this.client.user.setActivity(`${Constants.CONFETTI_REACTION_EMOJI} ${this.counter} Sunucu | ${process.env.PREFIX}help\nhttps://asena.xyz`, {
                type: 'PLAYING'
            })
        }, GuildHandler.UPDATE_INTERVAL)
    }

    public getCounter(): number{
        return this.counter
    }

}