import { Link } from 'react-router-dom';

export const RightsPage = () => {
  const linkStyle =
    'font-bold hover:text-yellow-600 transition-colors underline decoration-yellow-500 underline-offset-4';

  return (
    <div className="max-w-[1200px] mx-auto px-6 py-12 md:py-20 text-[#333]">
      <h1 className="text-4xl font-bold mb-10 border-b pb-4">
        Rights & Intellectual Property
      </h1>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4 text-[#1a1a1a]">
          1. General Provisions
        </h2>
        <p className="leading-relaxed mb-4">
          All rights to this website and its content are owned by{' '}
          <Link
            to="/"
            className={linkStyle}
          >
            Book Catalog
          </Link>
          . This platform is designed for literary enthusiasts, and the use of
          any of its elements is governed by applicable copyright laws.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4 text-[#1a1a1a]">
          2. Use of Book Covers and Descriptions
        </h2>
        <p className="leading-relaxed mb-4">
          Book cover images, publisher names, and author annotations presented
          in our catalog are the property of their respective copyright holders.
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            We use these materials solely for the purpose of book
            identification.
          </li>
          <li>
            <Link
              to="/"
              className={linkStyle}
            >
              Book Catalog
            </Link>{' '}
            does not claim authorship of images provided by publishers or
            partners.
          </li>
          <li>
            If you are a copyright holder and wish to modify or remove
            information about your publication, please contact our support team.
          </li>
        </ul>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4 text-[#1a1a1a]">
          3. User-Generated Content
        </h2>
        <p className="leading-relaxed mb-4">
          By leaving reviews or ratings on the site, you grant{' '}
          <Link
            to="/"
            className={linkStyle}
          >
            Book Catalog
          </Link>{' '}
          the right to publish and distribute them within our platform. However,
          the authorship of the review remains with you.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4 text-[#1a1a1a]">
          4. Prohibition of Copying
        </h2>
        <p className="leading-relaxed mb-4 font-medium">
          Any automated data collection (scraping) or full copying of our
          catalog&apos;s database without the explicit consent of{' '}
          <Link
            to="/"
            className={linkStyle}
          >
            Book Catalog
          </Link>{' '}
          is strictly prohibited and subject to legal action.
        </p>
      </section>

      <div className="bg-gray-100 p-6 rounded-lg border-l-4 border-yellow-500">
        <p className="text-sm italic">
          Last updated: February 17, 2026. We reserve the right to modify these
          terms without prior notice.
        </p>
      </div>
    </div>
  );
};
