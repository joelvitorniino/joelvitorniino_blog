import Link from "next/link";

export default function FooterComponent() {
    return (
      <footer className="absolute bottom-0 left-1/2 transform -translate-x-1/2 p-2 bg-white rounded-lg shadow dark:bg-gray-900 border-t border-gray-300 dark:border-gray-700">
        <span className="block text-sm text-gray-500 dark:text-gray-400">
          Blog do <Link href="https://www.linkedin.com/in/joel-vitor-niino-campos-b319ba238/">Joel Vitor</Link> &copy; 2023{" "}
        </span>
      </footer>
    );
  }
  