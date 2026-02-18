'use client';

import { useState } from 'react';

export default function ContactSection() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        topic: 'Technical Support',
        message: '',
    });
    const [showToast, setShowToast] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate form submission
        await new Promise(resolve => setTimeout(resolve, 1000));

        setShowToast(true);
        setIsSubmitting(false);

        // Reset form
        setFormData({
            name: '',
            email: '',
            topic: 'Technical Support',
            message: '',
        });

        // Hide toast after 3 seconds
        setTimeout(() => setShowToast(false), 3000);
    };

    return (
        <section id="contact" className="py-20 px-6 bg-white dark:bg-[#0a0b0f] border-t border-slate-100 dark:border-slate-800">
            <div className="max-w-xl mx-auto">
                <div className="text-center mb-8">
                    <h2 className="text-2xl font-bold mb-1 text-slate-900 dark:text-white">
                        Start a Conversation
                    </h2>
                    <p className="text-slate-500 dark:text-slate-400 text-sm">
                        Questions about the enterprise plan? We&apos;re here.
                    </p>
                </div>

                <div className="card-clean rounded-xl p-6 md:p-8">
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1.5">
                                    Name
                                </label>
                                <input
                                    type="text"
                                    className="input-clean text-sm"
                                    placeholder="Jane Doe"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1.5">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    className="input-clean text-sm"
                                    placeholder="jane@email.com"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1.5">
                                Topic
                            </label>
                            <div className="relative">
                                <select
                                    className="input-clean text-sm appearance-none cursor-pointer"
                                    value={formData.topic}
                                    onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                                >
                                    <option>Technical Support</option>
                                    <option>Sales Inquiry</option>
                                    <option>Partnership</option>
                                </select>
                                <span className="material-symbols-outlined absolute right-3 top-2.5 text-slate-400 dark:text-slate-500 text-[20px] pointer-events-none">
                                    expand_more
                                </span>
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1.5">
                                Message
                            </label>
                            <textarea
                                className="input-clean text-sm resize-none"
                                rows={3}
                                placeholder="How can we help you today?"
                                value={formData.message}
                                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                            ></textarea>
                        </div>

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full btn-primary py-3 rounded-lg font-semibold text-sm disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                            {isSubmitting ? (
                                <>
                                    <span className="animate-spin material-symbols-outlined text-[18px]">progress_activity</span>
                                    Sending...
                                </>
                            ) : (
                                'Send Message'
                            )}
                        </button>
                    </form>
                </div>
            </div>

            {/* Toast Notification */}
            {showToast && (
                <div className="fixed bottom-6 right-6 z-50 animate-fade-in-up">
                    <div className="bg-emerald-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-3">
                        <span className="material-symbols-outlined text-[20px]">check_circle</span>
                        <span className="font-medium text-sm">Message sent successfully!</span>
                    </div>
                </div>
            )}
        </section>
    );
}