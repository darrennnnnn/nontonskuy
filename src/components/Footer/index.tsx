export default function Footer() {
    return (
        <footer className="text-center py-8 border-t items-center justify-center flex">
            <p className="text-sm">
                &copy; {new Date().getFullYear()} NontonSkuy. All rights
                reserved.
            </p>
        </footer>
    );
}
