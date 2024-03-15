export default function Footer() {
    return (
        <footer className="bg-slate-900 text-white text-center py-8">
            <p className="text-sm">
                &copy; {new Date().getFullYear()} NontonSkuy. All rights
                reserved.
            </p>
        </footer>
    );
}
