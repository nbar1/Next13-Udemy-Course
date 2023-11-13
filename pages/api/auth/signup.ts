import type { NextApiRequest, NextApiResponse } from 'next';
import validator from 'validator';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { firstName, lastName, email, phone, city, password } = req.body;
    const errors: string[] = [];

    const validationSchema = [
      {
        validator: validator.isLength(firstName, { min: 1, max: 20 }),
        errorMessage: 'First name is invalid',
      },
      {
        validator: validator.isLength(lastName, { min: 1, max: 100 }),
        errorMessage: 'Last name is invalid',
      },
      {
        validator: validator.isEmail(email),
        errorMessage: 'Email is invalid',
      },
      {
        validator: validator.isMobilePhone(phone),
        errorMessage: 'Phone Number is invalid',
      },
      {
        validator: validator.isLength(city, { min: 1 }),
        errorMessage: 'City is invalid',
      },
      {
        validator: validator.isStrongPassword(password),
        errorMessage: 'Password is invalid',
      },
    ];

    validationSchema.forEach((item) => {
      if (!item.validator) {
        errors.push(item.errorMessage);
      }
    });

    if (errors.length > 0) {
      return res.status(400).json({ errorMessage: errors[0] });
    }

    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (user) {
      return res.status(400).json({ errorMessage: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        first_name: firstName,
        last_name: lastName,
        email,
        password: hashedPassword,
        phone,
        city,
      },
    });

    return res.status(200).json(newUser);
  }
}
