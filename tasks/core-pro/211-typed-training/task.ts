import { type User, regularUser } from './user-model.ts';

const formatName = (firstName, lastName) => {
  return `${firstName} ${lastName}`;
};

const formatAddress = (address) => {
  return `${address.street}, ${address.city}, ${address.country} ${address.postalCode}`;
};

const isCandidateForDeletion = (role, isActive) => {
  return role === 'guest' && !isActive;
};

const getUserLocale = (settings) => {
  return settings.language || 'en';
};

const validateAge = (dateOfBirth, minAge) => {
  const today = new Date();
  const age = today.getFullYear() - dateOfBirth.getFullYear();
  const monthDiff = today.getMonth() - dateOfBirth.getMonth();

  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dateOfBirth.getDate())) {
    return age - 1 >= minAge;
  }

  return age >= minAge;
};

const hasPhone = (phoneNumbers) => {
  return phoneNumbers.length > 0;
};

const canSendEmailNotification = (email, settings) => {
  return Boolean(email) && settings.notifications;
};

formatName(regularUser.firstName, regularUser.lastName);
formatAddress(regularUser.address);
isCandidateForDeletion(regularUser.role, regularUser.isActive);
getUserLocale(regularUser.settings);
validateAge(regularUser.dateOfBirth, 18);
hasPhone(regularUser.phoneNumbers);
canSendEmailNotification(regularUser.email, regularUser.settings);
