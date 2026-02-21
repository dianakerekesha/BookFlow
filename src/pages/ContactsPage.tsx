import React, { useState, useRef } from 'react';

const ContactFormField = {
  Name: 'name',
  Email: 'email',
  Message: 'message',
} as const;

export const ContactsPage = () => {
  const [formData, setFormData] = useState({
    [ContactFormField.Name]: '',
    [ContactFormField.Email]: '',
    [ContactFormField.Message]: '',
  });

  const [errors, setErrors] = useState({
    [ContactFormField.Name]: false,
    [ContactFormField.Email]: false,
    [ContactFormField.Message]: false,
  });

  const [file, setFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isMapOpen, setIsMapOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const newErrors = {
      [ContactFormField.Name]: !formData[ContactFormField.Name].trim(),
      [ContactFormField.Email]:
        !formData[ContactFormField.Email].trim() ||
        !formData[ContactFormField.Email].includes('@'),
      [ContactFormField.Message]: !formData[ContactFormField.Message].trim(),
    };
    setErrors(newErrors);

    if (!Object.values(newErrors).some(Boolean)) {
      console.log('Form submitted:', formData);
      console.log('Form submitted:', file);
      setIsSubmitted(true);
      setFormData({
        [ContactFormField.Name]: '',
        [ContactFormField.Email]: '',
        [ContactFormField.Message]: '',
      });
      setFile(null);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const address = 'Kyiv, Volodymyrska St, 42, office 105, 01001, Ukraine';
  const simpleMapUrl =
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2540.612046835153!2d30.51522817688029!3d50.44833218706245!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40d4ce50f375f191%3A0xe67c0505118748d1!2z0LLRg9C7LiDQktC-0LvQvtC00LjQvNC40YDRgdGM0LrQsCwgNDIsINCa0LjRl9CyLCAwMjAwMA!5e0!3m2!1suk!2sua!4v1700000000000!5m2!1suk!2sua';

  return (
    <div className="max-w-[1200px] mx-auto px-6 py-12 md:py-20">
      <h1 className="text-4xl font-bold mb-12">Contact Us</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="flex flex-col">
          <div className="flex flex-col space-y-[4px]">
            <a
              href="tel:+380800500123"
              className="text-xl transition-all hover:font-bold w-fit"
            >
              +38 (080) 500-12-34
            </a>
            <a
              href="tel:+380442345678"
              className="text-xl transition-all hover:font-bold w-fit"
            >
              +38 (044) 234-56-78
            </a>
            <p className="text-sm text-gray-500">
              Calls within Ukraine are free of charge
            </p>
          </div>

          <div className="mt-[10px]">
            <p className="text-gray-700">Call center: 9:00 AM – 8:00 PM</p>
          </div>

          <div className="mt-[20px]">
            <h3 className="font-bold text-lg mb-2">Our Address:</h3>
            <p className="text-gray-600 italic">
              Kyiv, Volodymyrska St, 42, office 105, 01001, Ukraine
            </p>
            <div className="flex flex-col gap-2">
              <span className="text-sm font-semibold">Find us on map:</span>
              <div
                onClick={() => setIsMapOpen(true)}
                className="relative w-full h-[150px] rounded-lg overflow-hidden cursor-zoom-in border border-gray-200 hover:opacity-90 transition-opacity"
              >
                <iframe
                  src={simpleMapUrl}
                  className="w-full h-full pointer-events-none"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                ></iframe>
                <div className="absolute inset-0 bg-transparent"></div>
              </div>
            </div>
            {isMapOpen && (
              <div
                className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4"
                onClick={() => setIsMapOpen(false)}
              >
                <div
                  className="relative w-3/4 h-3/4 bg-white rounded-xl overflow-hidden shadow-2xl"
                  onClick={(event) => event.stopPropagation()}
                >
                  <button
                    onClick={() => setIsMapOpen(false)}
                    className="absolute top-4 right-4 z-10 bg-white w-10 h-10 rounded-full font-bold shadow-md hover:bg-gray-100"
                  >
                    ✕
                  </button>

                  <div className="flex flex-col h-full">
                    <div className="p-4 bg-white border-b">
                      <p className="font-bold">{address}</p>
                    </div>
                    <iframe
                      src={simpleMapUrl}
                      className="w-full flex-grow"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                    ></iframe>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-col">
          <h2 className="text-2xl font-bold mb-6">Write to us:</h2>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col space-y-4"
          >
            <div>
              <input
                type="text"
                placeholder="Name"
                className={`w-full p-3 border rounded-lg outline-none transition-colors ${
                  errors[ContactFormField.Name] ?
                    'border-red-500'
                  : 'border-gray-300 focus:border-black'
                }`}
                value={formData[ContactFormField.Name]}
                onChange={(event) =>
                  setFormData({
                    ...formData,
                    [ContactFormField.Name]: event.target.value,
                  })
                }
              />
              {errors[ContactFormField.Name] && (
                <span className="text-red-500 text-xs mt-1">
                  This field is required
                </span>
              )}
            </div>

            <div>
              <input
                type="email"
                placeholder="Email"
                className={`w-full p-3 border rounded-lg outline-none transition-colors ${
                  errors[ContactFormField.Email] ?
                    'border-red-500'
                  : 'border-gray-300 focus:border-black'
                }`}
                value={formData[ContactFormField.Email]}
                onChange={(event) =>
                  setFormData({
                    ...formData,
                    [ContactFormField.Email]: event.target.value,
                  })
                }
              />
              {errors[ContactFormField.Email] && (
                <span className="text-red-500 text-xs mt-1">
                  Please enter a valid email
                </span>
              )}
            </div>

            <div>
              <textarea
                placeholder="Message"
                rows={4}
                className={`w-full p-3 border rounded-lg outline-none transition-colors resize-none ${
                  errors[ContactFormField.Message] ?
                    'border-red-500'
                  : 'border-gray-300 focus:border-black'
                }`}
                value={formData[ContactFormField.Message]}
                onChange={(event) =>
                  setFormData({
                    ...formData,
                    [ContactFormField.Message]: event.target.value,
                  })
                }
              />
              {errors[ContactFormField.Message] && (
                <span className="text-red-500 text-xs mt-1">
                  This field is required
                </span>
              )}
            </div>

            <div className="flex flex-col space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Attach file:
              </label>
              <input
                type="file"
                ref={fileInputRef}
                onChange={(event) =>
                  setFile(event.target.files ? event.target.files[0] : null)
                }
                className="text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-gray-100 file:text-black hover:file:bg-gray-200"
              />
            </div>

            <button
              type="submit"
              className="bg-black text-white py-3 rounded-lg font-bold hover:bg-gray-800 transition-colors uppercase tracking-wider"
            >
              Send Message
            </button>
            {isSubmitted && (
              <div className="mt-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg text-center font-medium">
                Your form has been successfully sent!
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};
