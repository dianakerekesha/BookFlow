import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { FirebaseLoginError } from '@/types/SignInErrors';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/context/AuthContext.tsx';
import {
  doSingInWithEmailAndPassword,
  doSingInWithGoogle,
} from '@/firebase/auth';
import { COLORS } from '@/constants/colors';
import { cn } from '@/lib/utils';

const LOGIN_ERROR_MESSAGES: Record<string, string> = {
  [FirebaseLoginError.InvalidCredential]: 'Incorrect email or password.',
  [FirebaseLoginError.UserNotFound]: 'No user with this email was found.',
  [FirebaseLoginError.PopupClosedByUser]: 'Google sign-in has been canceled.',
};

export function LoginForm() {
  const { userLoggedIn } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!isSigningIn) {
      setIsSigningIn(true);
      setErrorMessage('');
      try {
        await doSingInWithEmailAndPassword(email, password);
        setEmail('');
        setPassword('');
      } catch (error) {
        const errorCode = (error as { code: string }).code;
        if (errorCode in LOGIN_ERROR_MESSAGES) {
          setErrorMessage(LOGIN_ERROR_MESSAGES[errorCode]);
        } else {
          setErrorMessage('There was an error signing in. Please try again.');
        }
      } finally {
        setIsSigningIn(false);
      }
    }
  };

  const onGoogleSignIn = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (!isSigningIn) {
      setIsSigningIn(true);
      setErrorMessage('');
      try {
        await doSingInWithGoogle();
      } catch (error) {
        const errorCode = (error as { code: string }).code;
        if (errorCode in LOGIN_ERROR_MESSAGES) {
          setErrorMessage(LOGIN_ERROR_MESSAGES[errorCode]);
        }
      } finally {
        setIsSigningIn(false);
      }
    }
  };

  return (
    <>
      {userLoggedIn && (
        <Navigate
          to={'/'}
          replace={true}
        />
      )}
      <div className={cn('flex flex-col gap-6')}>
        <Card>
          <CardHeader>
            <CardTitle>Login to your account</CardTitle>
            <CardDescription>
              Enter your email below to login to your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <FieldGroup>
                <Field>
                  <FieldLabel htmlFor="email">Email</FieldLabel>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder="m@example.com"
                    required
                  />
                </Field>
                <Field>
                  <div className="flex items-center">
                    <FieldLabel htmlFor="password">Password</FieldLabel>
                  </div>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    required
                  />
                </Field>
                {errorMessage && (
                  <div className="text-red-500 text-sm font-medium text-center bg-red-50 p-2 rounded-md border border-red-200">
                    {errorMessage}
                  </div>
                )}
                <Field>
                  <Button
                    className={cn(COLORS.green, 'cursor-pointer')}
                    type="submit"
                    disabled={isSigningIn}
                  >
                    Sign in
                  </Button>
                  <Button
                    className="cursor-pointer"
                    variant="outline"
                    type="button"
                    onClick={onGoogleSignIn}
                    disabled={isSigningIn}
                  >
                    Sign in with Google
                  </Button>
                  <FieldDescription className="text-center">
                    Don&apos;t have an account?{' '}
                    <Link to={'/signup'}>Sign up</Link>
                  </FieldDescription>
                </Field>
              </FieldGroup>
            </form>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
