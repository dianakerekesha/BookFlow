import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import type { CheckoutFormValues } from '@/components/Checkout/helpers/checkoutSchema.ts';
import { checkoutSchema } from '@/components/Checkout/helpers/checkoutSchema.ts';
import { Button } from '@/components/ui/button.tsx';
import { Input } from '@/components/ui/input.tsx';
import { Label } from '@/components/ui/label.tsx';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select.tsx';
import { TYPOGRAPHY } from '@/constants/typography';
import { showError } from '@/lib/toast';
import { t } from 'i18next';

interface CheckoutFormProps {
  onSubmit: (data: CheckoutFormValues) => void;
  isLoading?: boolean;
}

const COUNTRIES = [
  'Ukraine',
  'United States',
  'United Kingdom',
  'Germany',
  'France',
  'Poland',
  'Canada',
  'Australia',
  'Other',
];

const FieldError = ({ message }: { message?: string }) => {
  return message ?
      <p className={`${TYPOGRAPHY.small} text-destructive mt-1`}>{message}</p>
    : null;
};

export const CheckoutForm = ({ onSubmit, isLoading }: CheckoutFormProps) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<CheckoutFormValues>({ resolver: zodResolver(checkoutSchema) });

  return (
    <form
      onSubmit={handleSubmit(onSubmit, () =>
        showError(t('toast.validationError')),
      )}
      noValidate
      className="flex flex-col gap-10"
    >
      <div className="flex flex-col gap-5">
        <p className={`${TYPOGRAPHY.uppercase} text-foreground`}>
          Contact information
        </p>

        <div className="grid grid-cols-2 gap-4 max-sm:grid-cols-1">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="firstName">First name</Label>
            <Input
              id="firstName"
              placeholder="John"
              className={errors.firstName ? 'border-destructive' : ''}
              {...register('firstName')}
            />
            <FieldError message={errors.firstName?.message} />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="lastName">Last name</Label>
            <Input
              id="lastName"
              placeholder="Doe"
              className={errors.lastName ? 'border-destructive' : ''}
              {...register('lastName')}
            />
            <FieldError message={errors.lastName?.message} />
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="john@example.com"
            className={errors.email ? 'border-destructive' : ''}
            {...register('email')}
          />
          <FieldError message={errors.email?.message} />
        </div>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="phone">Phone</Label>
          <Input
            id="phone"
            type="tel"
            placeholder="+380 xx xxx xx xx"
            className={errors.phone ? 'border-destructive' : ''}
            {...register('phone')}
          />
          <FieldError message={errors.phone?.message} />
        </div>
      </div>

      <div className="flex flex-col gap-5">
        <p className={`${TYPOGRAPHY.uppercase} text-foreground`}>
          Delivery address
        </p>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="address">Street address</Label>
          <Input
            id="address"
            placeholder="123 Main Street, Apt 4B"
            className={errors.address ? 'border-destructive' : ''}
            {...register('address')}
          />
          <FieldError message={errors.address?.message} />
        </div>

        <div className="grid grid-cols-2 gap-4 max-sm:grid-cols-1">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="city">City</Label>
            <Input
              id="city"
              placeholder="Kyiv"
              className={errors.city ? 'border-destructive' : ''}
              {...register('city')}
            />
            <FieldError message={errors.city?.message} />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="zip">ZIP / Postal code</Label>
            <Input
              id="zip"
              placeholder="01001"
              className={errors.zip ? 'border-destructive' : ''}
              {...register('zip')}
            />
            <FieldError message={errors.zip?.message} />
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <Label>Country</Label>
          <Select
            onValueChange={(val) =>
              setValue('country', val, { shouldValidate: true })
            }
          >
            <SelectTrigger
              className={errors.country ? 'border-destructive' : ''}
            >
              <SelectValue placeholder="Select country" />
            </SelectTrigger>
            <SelectContent>
              {COUNTRIES.map((country) => (
                <SelectItem
                  key={country}
                  value={country}
                >
                  {country}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FieldError message={errors.country?.message} />
        </div>
      </div>

      <Button
        type="submit"
        disabled={isLoading}
        className={`h-14 ${TYPOGRAPHY.uppercase}`}
      >
        {isLoading ?
          <Loader2 className="w-5 h-5 animate-spin" />
        : 'Proceed to Payment'}
      </Button>
    </form>
  );
};
