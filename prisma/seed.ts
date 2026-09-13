import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  const hashedPassword = await bcrypt.hash("admin123", 12);

  const admin = await prisma.user.upsert({
    where: { email: "admin@sbcollege.ac.in" },
    update: {},
    create: {
      name: "Department Admin",
      email: "admin@sbcollege.ac.in",
      password: hashedPassword,
      role: "ADMIN",
    },
  });

  console.log(`✅ Admin user created: ${admin.email}`);
  console.log(`   Password: admin123`);
  console.log(`   Role: ${admin.role}`);
  console.log("");
  console.log("🔑 Login at http://localhost:3000/login");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error("❌ Seed failed:", e);
    await prisma.$disconnect();
    process.exit(1);
  });
