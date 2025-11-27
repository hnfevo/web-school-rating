import { sequelize } from './config/database.js';
import { User, Institution, Criterion, AdminRating, PublicRating } from './models/index.js';
import bcrypt from 'bcryptjs';

const seedDatabase = async () => {
    try {
        console.log('🌱 Starting database seeding...');

        // Sync database (force: true will drop existing tables)
        await sequelize.sync({ force: true });
        console.log('✓ Database synced');

        // Create admin user
        const hashedPassword = await bcrypt.hash('admin123', 10);
        const admin = await User.create({
            name: 'Admin',
            email: 'admin@example.com',
            password: hashedPassword
        });
        console.log('✓ Admin user created (email: admin@example.com, password: admin123)');

        // Create criteria
        const criteria = await Promise.all([
            Criterion.create({ name: 'Kualitas Pengajaran', maxScore: 10, weight: 1.5, order: 1 }),
            Criterion.create({ name: 'Fasilitas', maxScore: 10, weight: 1.0, order: 2 }),
            Criterion.create({ name: 'Akreditasi', maxScore: 10, weight: 1.2, order: 3 })
        ]);
        console.log('✓ Created 3 criteria');

        // Create institutions
        const institutions = await Promise.all([
            Institution.create({
                nama: 'SMK Negeri 1 Jakarta',
                alamat: 'Jl. Merdeka No. 1, Jakarta Pusat',
                email: 'info@smkn1jakarta.sch.id'
            }),
            Institution.create({
                nama: 'SMK Negeri 2 Bandung',
                alamat: 'Jl. Sudirman No. 45, Bandung',
                email: 'info@smkn2bandung.sch.id'
            }),
            Institution.create({
                nama: 'SMK Negeri 3 Surabaya',
                alamat: 'Jl. Pahlawan No. 12, Surabaya',
                email: 'info@smkn3surabaya.sch.id'
            }),
            Institution.create({
                nama: 'SMK Negeri 4 Yogyakarta',
                alamat: 'Jl. Malioboro No. 88, Yogyakarta',
                email: 'info@smkn4yogya.sch.id'
            })
        ]);
        console.log('✓ Created 4 institutions');

        // Create admin ratings for first 3 institutions
        for (let i = 0; i < 3; i++) {
            for (const criterion of criteria) {
                await AdminRating.create({
                    institutionId: institutions[i].id,
                    criterionId: criterion.id,
                    score: Math.floor(Math.random() * 3) + 7 // Random score between 7-10
                });
            }
        }
        console.log('✓ Created admin ratings for 3 institutions');

        // Create public ratings
        const publicRatingsData = [
            { institutionId: institutions[0].id, rating: 5, comment: 'Sangat bagus!' },
            { institutionId: institutions[0].id, rating: 4, comment: 'Memuaskan' },
            { institutionId: institutions[1].id, rating: 5, comment: 'Excellent!' },
            { institutionId: institutions[1].id, rating: 4, comment: 'Good' },
            { institutionId: institutions[1].id, rating: 5, comment: 'Recommended' },
            { institutionId: institutions[2].id, rating: 3, comment: 'Cukup baik' }
        ];

        for (const data of publicRatingsData) {
            await PublicRating.create(data);
        }
        console.log('✓ Created public ratings');

        console.log('\n✅ Database seeding completed successfully!');
        console.log('\n📝 Login credentials:');
        console.log('   Email: admin@example.com');
        console.log('   Password: admin123');

        process.exit(0);
    } catch (error) {
        console.error('❌ Error seeding database:', error);
        process.exit(1);
    }
};

seedDatabase();
