


interface SeedData{
    entries: seedEntry[]
}

interface seedEntry {
    description: string,
    status: string,
    createdAt: number
}


export const seedData: SeedData ={
    entries:[
        {
            description: 'Lorem pending',
            status: 'pending',
            createdAt: Date.now()
        },
        {
            description: 'Lorem in progresssss',
            status: 'in-progress',
            createdAt: Date.now() - 100000
        },
        {
            description: 'Lorem finish',
            status: 'finished',
            createdAt: Date.now() - 1000000000
        }
    ]
}