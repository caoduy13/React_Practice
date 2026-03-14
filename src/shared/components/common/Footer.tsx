export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-[#a67c52] via-[#b89070] to-[#a67c52] dark:from-[#2d2018] dark:via-[#3d2820] dark:to-[#2d2018] text-white py-6 mt-auto border-t border-white/10">
      <div className="container mx-auto px-4 text-center">
        <p className="text-sm text-white/95">
          &copy; {new Date().getFullYear()} Sweet Crumbs Bakery. All rights
          reserved.
        </p>
      </div>
    </footer>
  );
}
