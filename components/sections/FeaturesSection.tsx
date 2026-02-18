'use client';

export default function FeaturesSection() {
    const features = [
        {
            icon: 'bolt',
            title: 'Lightning Fast',
            description:
                'Static generation via Next.js makes zero JavaScript overhead for content. Pages load in milliseconds.',
        },
        {
            icon: 'code',
            title: 'Auto-Generated API',
            description:
                'Your OpenAPI spec is the source of truth. We generate interactive documentation from your actual endpoints.',
        },
        {
            icon: 'verified_user',
            title: 'Enterprise Secure',
            description:
                'Built-in authentication, role-based access control, and audit logs. Security isn\'t an afterthought.',
        },
    ];

    return (
        <section id="about" className="py-20 px-6 bg-white dark:bg-[#0a0b0f] border-t border-slate-100 dark:border-slate-800">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold mb-3 text-slate-900 dark:text-white">
                        Transparent Architecture
                    </h2>
                    <p className="text-slate-500 dark:text-slate-400 max-w-xl mx-auto text-sm">
                        Built on a modern stack designed for speed, clarity, and developer happiness.
                        Every component is crafted with precision.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                    {features.map((feature, index) => (
                        <div key={index} className="card-clean rounded-xl p-6">
                            <div className="w-10 h-10 rounded-lg bg-indigo-50 dark:bg-indigo-900/30 flex items-center justify-center mb-4 text-indigo-600 dark:text-indigo-400">
                                <span className="material-symbols-outlined text-[24px]">
                                    {feature.icon}
                                </span>
                            </div>
                            <h3 className="text-lg font-semibold mb-2 text-slate-900 dark:text-white">
                                {feature.title}
                            </h3>
                            <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}