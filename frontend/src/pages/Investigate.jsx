import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiCreateInvestigation } from '../services/api';
import Logo from '../components/Logo';

const MAX_IMAGE_SIZE_MB = 4;

const LOADING_STEPS = [
    { icon: '🔍', text: 'Analyzing claim...' },
    { icon: '🌐', text: 'Checking sources...' },
    { icon: '🧠', text: 'Running AI verification...' },
    { icon: '🔎', text: 'Scanning for bias markers...' },
    { icon: '📊', text: 'Generating report...' },
];

const Investigate = () => {
    const [formData, setFormData] = useState({ caption: '', sourceUrl: '', imageUrl: '' });
    const [imageFile, setImageFile] = useState(null);
    const [dragging, setDragging] = useState(false);
    const [loading, setLoading] = useState(false);
    const [loadingStep, setLoadingStep] = useState(0);
    const [error, setError] = useState('');
    const fileInputRef = useRef();
    const navigate = useNavigate();

    // Cycle through loading steps while AI processes
    useEffect(() => {
        if (!loading) { setLoadingStep(0); return; }
        const interval = setInterval(() => {
            setLoadingStep(prev => (prev + 1) % LOADING_STEPS.length);
        }, 1800);
        return () => clearInterval(interval);
    }, [loading]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const processFile = (file) => {
        if (!file) return;
        if (!file.type.startsWith('image/')) {
            setError('Please upload an image file (JPG, PNG, WEBP, GIF).');
            return;
        }
        if (file.size > MAX_IMAGE_SIZE_MB * 1024 * 1024) {
            setError(`Image must be under ${MAX_IMAGE_SIZE_MB}MB.`);
            return;
        }
        setError('');
        const reader = new FileReader();
        reader.onload = (ev) => {
            const dataUrl = ev.target.result;
            const base64 = dataUrl.split(',')[1];
            setImageFile({ preview: dataUrl, base64, mimeType: file.type, name: file.name });
        };
        reader.readAsDataURL(file);
    };

    const handleFileInput = (e) => processFile(e.target.files[0]);
    const handleDrop = (e) => {
        e.preventDefault();
        setDragging(false);
        processFile(e.dataTransfer.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        if (!formData.caption && !formData.sourceUrl && !imageFile && !formData.imageUrl) {
            setError('Please provide a caption, source URL, image URL, or upload an image to investigate.');
            return;
        }
        try {
            setLoading(true);
            await apiCreateInvestigation({
                caption: formData.caption,
                sourceUrl: formData.sourceUrl,
                imageUrl: formData.imageUrl,
                imageData: imageFile ? { base64: imageFile.base64, mimeType: imageFile.mimeType } : null,
            });
            navigate('/dashboard');
        } catch (err) {
            setError(err.message || 'Failed to submit investigation. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const labelClass = "block text-sm font-semibold text-zinc-700 dark:text-zinc-300 mb-2";

    return (
        <div className="w-full max-w-2xl mx-auto pt-16 md:pt-24 pb-16 px-4 relative">
            
            {/* Ambient Background Glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-indigo-500/10 blur-[100px] rounded-[100%] pointer-events-none -z-10 hidden dark:block" />

            {/* Header */}
            <div className="mb-8 md:mb-10 text-center flex flex-col items-center">
                <Logo className="w-12 h-12 md:w-14 md:h-14 drop-shadow-lg mb-6 hover:scale-105 transition-transform" />
                <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-white mb-3 tracking-tight" style={{fontFamily: 'Outfit, sans-serif'}}>
                    New Investigation
                </h2>
                <p className="text-zinc-500 dark:text-zinc-400 text-sm max-w-md mx-auto">
                    Submit text, a source, or an image. The multimodal AI will analyze and fact-check it instantly.
                </p>
            </div>

            <div className="bento-card p-5 sm:p-8 md:p-10 shadow-2xl dark:shadow-none">
                {error && (
                    <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 text-red-500 rounded-xl text-sm font-medium">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-8">
                    {/* Caption */}
                    <div>
                        <label className={labelClass} htmlFor="caption">
                            Claim / Text <span className="text-zinc-400 font-normal ml-1">(Optional)</span>
                        </label>
                        <textarea
                            id="caption" name="caption" rows={3}
                            value={formData.caption} onChange={handleChange}
                            placeholder="Paste the viral claim or text you want to investigate..."
                            className="input-premium w-full px-4 py-3 rounded-xl resize-none text-sm leading-relaxed"
                        />
                    </div>

                    {/* Image Upload */}
                    <div>
                        <label className={labelClass}>
                            Visual Evidence <span className="text-zinc-400 font-normal ml-1">(Optional)</span>
                        </label>

                        {imageFile ? (
                            /* Preview */
                            <div className="relative rounded-2xl overflow-hidden border border-zinc-200 dark:border-white/10 bg-zinc-50 dark:bg-white/[0.02]">
                                <img src={imageFile.preview} alt="Preview" className="w-full max-h-72 object-contain bg-black/5 dark:bg-black/20" />
                                <div className="absolute top-3 right-3">
                                    <button type="button" onClick={() => setImageFile(null)}
                                        className="px-3 py-1.5 bg-black/50 backdrop-blur-md text-white text-xs font-medium rounded-lg hover:bg-black/70 transition-colors border border-white/10">
                                        ✕ Remove
                                    </button>
                                </div>
                                <div className="p-4 border-t border-zinc-200 dark:border-white/5 flex items-center justify-between text-xs">
                                    <div className="flex items-center gap-2 text-zinc-900 dark:text-zinc-300 font-medium">
                                        <span>📷</span>
                                        <span className="truncate max-w-[200px]">{imageFile.name}</span>
                                    </div>
                                    <span className="text-indigo-500 dark:text-indigo-400 font-medium">Multimodal attached</span>
                                </div>
                            </div>
                        ) : (
                            /* Drop zone */
                            <div
                                onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
                                onDragLeave={() => setDragging(false)}
                                onDrop={handleDrop}
                                onClick={() => fileInputRef.current?.click()}
                                className={`relative cursor-pointer rounded-2xl border flex flex-col items-center justify-center p-12 text-center transition-all duration-300 ${
                                    dragging
                                        ? 'border-indigo-500 bg-indigo-500/5'
                                        : 'border-dashed border-zinc-300 dark:border-zinc-700 hover:border-zinc-400 dark:hover:border-zinc-500 hover:bg-zinc-50 dark:hover:bg-white/[0.02]'
                                }`}
                            >
                                <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileInput} className="hidden" />
                                <div className={`text-4xl mb-4 transition-transform duration-300 ${dragging ? '-translate-y-2 scale-110' : ''}`}>
                                    {dragging ? '📥' : '🖼️'}
                                </div>
                                <h3 className="font-semibold text-zinc-900 dark:text-white mb-1">
                                    {dragging ? 'Drop to analyze' : 'Upload Screenshot'}
                                </h3>
                                <p className="text-zinc-500 dark:text-zinc-400 text-sm mb-4">
                                    Drag and drop or click to browse
                                </p>
                                <div className="flex items-center gap-4 text-xs font-semibold text-zinc-400 uppercase tracking-widest">
                                    <span>JPG</span>
                                    <span className="w-1 h-1 rounded-full bg-zinc-300 dark:bg-zinc-700"></span>
                                    <span>PNG</span>
                                    <span className="w-1 h-1 rounded-full bg-zinc-300 dark:bg-zinc-700"></span>
                                    <span>WEBP</span>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Source URL */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className={labelClass} htmlFor="sourceUrl">
                                Article / Source Link <span className="text-zinc-400 font-normal ml-1">(Optional)</span>
                            </label>
                            <input id="sourceUrl" name="sourceUrl" type="url" value={formData.sourceUrl} onChange={handleChange}
                                placeholder="https://news-site.com/article/123" className="input-premium w-full px-4 py-3 rounded-xl text-sm" />
                        </div>
                        <div>
                            <label className={labelClass} htmlFor="imageUrl">
                                Image URL Link <span className="text-zinc-400 font-normal ml-1">(Optional)</span>
                            </label>
                            <input id="imageUrl" name="imageUrl" type="url" value={formData.imageUrl} onChange={handleChange}
                                disabled={!!imageFile}
                                placeholder={imageFile ? "Image file already attached" : "https://example.com/image.jpg"} 
                                className="input-premium w-full px-4 py-3 rounded-xl text-sm disabled:opacity-50" />
                        </div>
                    </div>

                    {/* Submit */}
                    <div className="pt-4 flex items-center justify-end gap-3">
                        <button type="button" onClick={() => navigate('/dashboard')}
                            className="px-6 py-3 text-sm font-medium text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white transition-colors">
                            Cancel
                        </button>
                        <button type="submit" disabled={loading}
                            className="btn-premium px-8 py-3 rounded-full font-semibold text-sm disabled:opacity-90 disabled:cursor-not-allowed flex items-center gap-2 min-w-[200px] justify-center">
                            {loading ? (
                                <>
                                    <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin shrink-0" />
                                    <span className="transition-all duration-500">
                                        {LOADING_STEPS[loadingStep].icon} {LOADING_STEPS[loadingStep].text}
                                    </span>
                                </>
                            ) : (
                                <>{imageFile || formData.imageUrl ? 'Scan Evidence' : 'Run Investigation'}</>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Investigate;
