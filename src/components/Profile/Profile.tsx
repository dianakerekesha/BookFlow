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
