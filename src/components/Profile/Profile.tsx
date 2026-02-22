import { useEffect, useState } from 'react';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Dialog, DialogContent } from '@/components/ui/Dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/context/AuthContext.tsx';
import { firestore } from '@/firebase/firebase';
import { getUserOrders } from '@/services/paymentAPI';
import { Link } from 'react-router-dom';
import Lottie from 'lottie-react';
import emptyOrdersAnimation from '@/assets/NO RESULTS.json';

interface ProfileFormData {
  name: string;
  email: string;
  avatar?: string;
}

interface ProfileProps {
  open: boolean;
  onClose: () => void;
}

export const Profile = ({ open, onClose }: ProfileProps) => {
  const [formData, setFormData] = useState<ProfileFormData>({
    name: '',
    email: '',
  });
  const [initialData, setInitialData] = useState<ProfileFormData>({
    name: '',
    email: '',
  });
  const [hasOrders, setHasOrders] = useState<boolean | null>(null);

  const { currentUser } = useAuth();
  const isChanged = formData.name !== initialData.name;

  useEffect(() => {
    const loadUser = async () => {
      if (!currentUser) return;

      const docRef = doc(firestore, 'users', currentUser.uid);
      const snap = await getDoc(docRef);

      if (snap.exists()) {
        const data = snap.data();

        const userData = {
          name: data.name || '',
          email: currentUser.email || '',
        };

        setFormData(userData);
        setInitialData(userData);
      }

      const orders = await getUserOrders();
      setHasOrders(orders.length > 0);
    };

    loadUser();
  }, [currentUser]);

  const handleSave = async () => {
    if (!currentUser) {
      return;
    }

    const docRef = doc(firestore, 'users', currentUser.uid);

    await updateDoc(docRef, {
      name: formData.name,
    });

    setInitialData(formData);
  };

  const handleCancel = () => {
    setFormData(initialData);
  };

  if (!open) return null;

  return (
    <Dialog
      open={open}
      onOpenChange={onClose}
    >
      <DialogContent className="max-w-lg p-0 overflow-hidden border-none shadow-lg">
        <Card className="border-none shadow-none rounded-none">
          <CardHeader>
            <CardTitle>Profile</CardTitle>
            <CardDescription>Update your personal information</CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                placeholder="Enter your name"
                value={formData.name}
                onChange={(event) =>
                  setFormData({ ...formData, name: event.target.value })
                }
              />
            </div>

            <div className="space-y-2">
              <Label>Email</Label>
              <div className="h-10 flex items-center px-3 bg-muted text-sm rounded-md">
                {formData.email}
              </div>
            </div>
          </CardContent>

          {hasOrders !== null && (
            <div className="px-6 py-4 border-t flex justify-center">
              {hasOrders ?
                <Link
                  to="/orders"
                  className="group inline-flex items-center gap-2 rounded-xl border border-border bg-muted/50 px-6 py-3 text-sm font-medium text-foreground transition-all hover:bg-muted hover:shadow-sm"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 text-muted-foreground transition-transform group-hover:scale-110"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                    <line
                      x1="3"
                      y1="6"
                      x2="21"
                      y2="6"
                    />
                    <path d="M16 10a4 4 0 0 1-8 0" />
                  </svg>
                  View My Orders
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-3.5 w-3.5 text-muted-foreground transition-transform group-hover:translate-x-0.5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </Link>
              : <div className="flex flex-col items-center gap-2 text-center">
                  <Lottie
                    animationData={emptyOrdersAnimation}
                    loop
                    className="w-32 h-32"
                  />
                  <p className="text-sm text-muted-foreground">
                    You don&apos;t have any orders yet
                  </p>
                </div>
              }
            </div>
          )}

          <CardFooter className="flex justify-end gap-2">
            <Button
              variant="outline"
              onClick={handleCancel}
              disabled={!isChanged}
            >
              Cancel
            </Button>

            <Button
              onClick={handleSave}
              disabled={!isChanged}
            >
              Save Changes
            </Button>
          </CardFooter>
        </Card>
      </DialogContent>
    </Dialog>
  );
};
