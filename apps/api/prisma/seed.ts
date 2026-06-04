import { PrismaClient, Role } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('Cleaning up database...');
  await prisma.user.deleteMany({});
  await prisma.employee.deleteMany({});

  console.log('Seeding admin user...');
  const adminPasswordHash = await bcrypt.hash('admin123', 12);
  const adminUser = await prisma.user.create({
    data: {
      email: 'admin@enterprise.com',
      password: adminPasswordHash,
    },
  });
  console.log(`Admin user created: ${adminUser.email}`);

  console.log('Seeding employees...');
  const departments = ['IT', 'HR', 'Finance', 'Marketing', 'Sales', 'Operations'];
  const firstNames = [
    'Jean', 'Marie', 'Pierre', 'Michel', 'Philippe', 'Thomas', 'Julien', 'Nicolas',
    'Sarah', 'Elodie', 'Camille', 'Julie', 'Sophie', 'Aurélie', 'Antoine', 'Lucas',
    'Maxime', 'Alexandre', 'Emma', 'Léa', 'Chloé', 'Manon', 'Clara'
  ];
  const lastNames = [
    'Martin', 'Bernard', 'Thomas', 'Petit', 'Robert', 'Richard', 'Durand', 'Dubois',
    'Moreau', 'Laurent', 'Simon', 'Michel', 'Lefebvre', 'Leroy', 'Roux', 'David',
    'Bertrand', 'Morel', 'Fournier', 'Girard', 'Bonnet', 'Dupont', 'Lambert'
  ];

  const employeesData: any[] = [];

  for (let i = 0; i < 25; i++) {
    const firstName = firstNames[i % firstNames.length];
    const LastName = lastNames[i % lastNames.length];
    const email = `${firstName.toLowerCase()}.${LastName.toLowerCase()}${i}@enterprise.com`;
    const department = departments[i % departments.length];
    const phone = `+33 6 ${String(Math.floor(10000000 + Math.random() * 90000000)).replace(/(.{2})/g, '$1 ').trim()}`;
    const role = i === 0 ? Role.ADMIN : Role.EMPLOYEE; // Make the first one an Admin employee
    const status = Math.random() > 0.15 ? 'active' : 'inactive';

    employeesData.push({
      firstName,
      LastName,
      email,
      department,
      phone,
      role,
      status,
    });
  }

  for (const employee of employeesData) {
    await prisma.employee.create({
      data: employee,
    });
  }

  console.log(`Successfully seeded ${employeesData.length} employees.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
