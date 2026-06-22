export interface PuzzleStep {
  id: number;
  titleAr: string;
  titleEn: string;
  descAr?: string;
  descEn?: string;
  expectedAnswer?: string;
  mediaType?: 'text' | 'image' | 'video' | 'map';
  mediaUrl?: string;
}

export const puzzleSequence: PuzzleStep[] = [
  {
    id: 1,
    titleAr: "تذاكر",
    titleEn: "Tickets",
    descAr: "لقد حصلتم على التذاكر لدخول النادي الليلي... أدخل الرمز الموجود على التذكرة للبدء.",
    descEn: "You got the tickets to enter the night club... Enter the code on the ticket to begin.",
    expectedAnswer: "777",
    mediaType: "image",
    mediaUrl: "https://images.unsplash.com/photo-1540866037326-78b1ce5923c6?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: 2,
    titleAr: "فيديو عن البيت",
    titleEn: "Video about the house",
    descAr: "شاهد هذا الفيديو لتفهم ما حدث. ما هو رقم الغرفة الملعونة؟",
    descEn: "Watch this video to understand what happened. What is the number of the cursed room?",
    expectedAnswer: "13",
    mediaType: "video",
    mediaUrl: "https://www.w3schools.com/html/mov_bbb.mp4" // Placeholder
  },
  {
    id: 3,
    titleAr: "الكلمه السريه",
    titleEn: "The secret password",
    descAr: "الكلمة السرية تكمن في الظلام... ما هي؟",
    descEn: "The secret word lies in the dark... What is it?",
    expectedAnswer: "ظلام",
  },
  {
    id: 4,
    titleAr: "شهادات ميلاد للسادات و مراته",
    titleEn: "Birth certificates for Sadat and his wife",
    descAr: "في أي سنة ولدت زوجته؟",
    descEn: "In what year was his wife born?",
    expectedAnswer: "1980",
    mediaType: "image",
    mediaUrl: "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: 5,
    titleAr: "جواب من الام للثلاث عيال الي كانو راجعين من البيت و هما مش موجودين",
    titleEn: "Letter from the mother to the missing children",
    descAr: "الرسالة تحتوي على اسم المستشفى. ما هو؟",
    descEn: "The letter contains the hospital's name. What is it?",
    expectedAnswer: "الرحمة",
    mediaType: "text"
  },
  {
    id: 6,
    titleAr: "شهاده وفاه بالدم للسادات",
    titleEn: "Blood-stained death certificate for Sadat",
    descAr: "سبب الوفاة مشفر. أدخل الكلمة.",
    descEn: "Cause of death is encrypted. Enter the word.",
    expectedAnswer: "مسموم",
    mediaType: "image",
    mediaUrl: "https://images.unsplash.com/photo-1509927083803-4bd519298ac4?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: 7,
    titleAr: "اول يجاوب سري للقتل النور هيقفل و يدخل",
    titleEn: "First secret answer for the murder",
    descAr: "من هو القاتل؟",
    descEn: "Who is the killer?",
    expectedAnswer: "الاب",
  },
  {
    id: 8,
    titleAr: "صوره لانتحار الام و اختفاء اصغر عيل من التلاته",
    titleEn: "Photo of mother's suicide and missing youngest child",
    descAr: "تاريخ الانتحار هو المفتاح.",
    descEn: "The date of suicide is the key.",
    expectedAnswer: "1999",
    mediaType: "image",
    mediaUrl: "https://images.unsplash.com/photo-1517486430290-3565714afd87?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: 9,
    titleAr: "شهادات الميلاد بالكلمه السريه",
    titleEn: "Birth certificates with the secret word",
    descAr: "اجمع الحروف المخفية.",
    descEn: "Collect the hidden letters.",
    expectedAnswer: "النهاية",
  },
  {
    id: 10,
    titleAr: "فيديو للسادات في الحرب بمورس كود",
    titleEn: "Morse code video",
    descAr: "ترجم المورس كود.",
    descEn: "Translate the morse code.",
    expectedAnswer: "sos",
  },
  {
    id: 11,
    titleAr: "صور ضوضاء عليها شيطانيه للواد الصغير",
    titleEn: "Satanic noise pictures of the boy",
    descAr: "ما هو الرمز خلف الضوضاء؟",
    descEn: "What is the symbol behind the noise?",
    expectedAnswer: "666",
    mediaType: "image",
    mediaUrl: "https://images.unsplash.com/photo-1509231908470-80a22129e612?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: 12,
    titleAr: "الحل في كيس الشيبسي",
    titleEn: "Solution in chips bag",
    descAr: "الباركود على الكيس...",
    descEn: "The barcode on the bag...",
    expectedAnswer: "010",
  },
  {
    id: 13,
    titleAr: "لعبه الفوازير",
    titleEn: "Riddles game",
    descAr: "شيء يبكي بلا عينين ويمشي بلا قدمين؟",
    descEn: "Something that cries without eyes and walks without feet?",
    expectedAnswer: "سحاب",
  },
  {
    id: 14,
    titleAr: "الحل في اخر كيس شيبسي",
    titleEn: "Solution in last chips bag",
    descAr: "النكهة هي المفتاح.",
    descEn: "The flavor is the key.",
    expectedAnswer: "ملح",
  },
  {
    id: 15,
    titleAr: "جوجل ماب",
    titleEn: "Google Maps Location",
    descAr: "أين وقعت الحادثة؟ (إحداثيات)",
    descEn: "Where did the incident happen? (coordinates)",
    expectedAnswer: "30.0,31.2",
    mediaType: "map"
  },
  {
    id: 16,
    titleAr: "بونبوني و شهاده تبني للواد كامله",
    titleEn: "The Final Truth: Bonbon and adoption certificate",
    descAr: "الاب قتل الطفل وعادت روحه... أدخل اسم الطفل لإنهاء اللعنة.",
    descEn: "The father killed the boy and his spirit returned... Enter the boy's name to break the curse.",
    expectedAnswer: "ادم",
  }
];
