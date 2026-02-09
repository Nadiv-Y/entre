export default function Duration (start: string, end: string):string{
    const startDate = new Date(start)
    const endDate = new Date(end)
    const durationMS = endDate.getTime()-startDate.getTime()
    const seconds = Math.floor(durationMS / 1000)
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60)
    const days = Math.floor(hours / 24)
    const finalDuration = `${hours % 24} hours, ${minutes % 60} minutes`
    return finalDuration
}