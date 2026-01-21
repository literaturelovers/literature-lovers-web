import bcrypt from 'bcryptjs';
import { db } from '../lib/db';

async function createAdminUser() {
  try {
    const adminEmail = 'admin@literaturelover.com';
    const adminPassword = 'admin123'; // Change this!
    const adminName = 'Literature Lover Admin';

    // Check if admin already exists
    const existingAdmin = await db.user.findUnique({
      where: { email: adminEmail }
    });

    if (existingAdmin) {
      console.log('Admin user already exists');
      return;
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(adminPassword, 10);

    // Create admin user
    const adminUser = await db.user.create({
      data: {
        email: adminEmail,
        password: hashedPassword,
        name: adminName,
        role: 'ADMIN'
      }
    });

    console.log('Admin user created successfully:');
    console.log('ID:', adminUser.id);
    console.log('Email:', adminEmail);
    console.log('Password:', adminPassword);
    console.log('IMPORTANT: Change the password immediately!');

  } catch (error) {
    console.error('Error creating admin user:', error);
  } finally {
    await db.$disconnect();
  }
}

createAdminUser();