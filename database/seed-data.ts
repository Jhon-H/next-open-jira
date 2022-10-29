
interface SeedData {
  entries: SeedEntry[]
}

interface SeedEntry {
  description: string;
  status: string;
  createdAt: number;
}

export const seedData: SeedData = {
  entries: [
    {
      description: 'Duis sint fugiat magna sint. Proident mollit consectetur aute dolor ad cillum. Id amet ut proident esse ea velit id quis officia elit excepteur. Do id amet fugiat non dolor aliqua. Tempor commodo do incididunt aute duis. Et aliquip cupidatat minim aute do.',
      status: 'pending',
      createdAt: Date.now()
    },
    {
      description: 'In-progress Ipsum duis deserunt aliquip in quis consectetur tempor laborum in nisi consequat veniam culpa est. Mollit minim fugiat commodo ullamco reprehenderit fugiat eiusmod. Mollit eiusmod aute est dolore tempor Lorem qui laborum.',
      status: 'in-progress',
      createdAt: Date.now()
    },
    {
      description: 'Finish - Est minim Lorem elit veniam aliqua tempor laborum dolor cupidatat cupidatat sit. Et incididunt est reprehenderit consequat aliquip ut ex amet consectetur pariatur minim. Aute dolore veniam do sit et culpa proident proident. Officia nostrud qui ullamco consectetur reprehenderit qui dolore id Lorem est nostrud esse labore eiusmod. Aliquip nisi irure ullamco velit nulla nostrud pariatur nulla enim esse elit sit non adipisicing.',
      status: 'finished',
      createdAt: Date.now()
    },
  ]
}
