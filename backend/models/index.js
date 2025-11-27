import User from './User.js';
import Institution from './Institution.js';
import Criterion from './Criterion.js';
import AdminRating from './AdminRating.js';
import PublicRating from './PublicRating.js';

// Define associations
Institution.hasMany(AdminRating, { foreignKey: 'institutionId', onDelete: 'CASCADE' });
AdminRating.belongsTo(Institution, { foreignKey: 'institutionId' });

Criterion.hasMany(AdminRating, { foreignKey: 'criterionId', onDelete: 'CASCADE' });
AdminRating.belongsTo(Criterion, { foreignKey: 'criterionId' });

Institution.hasMany(PublicRating, { foreignKey: 'institutionId', onDelete: 'CASCADE' });
PublicRating.belongsTo(Institution, { foreignKey: 'institutionId' });

export {
    User,
    Institution,
    Criterion,
    AdminRating,
    PublicRating
};
