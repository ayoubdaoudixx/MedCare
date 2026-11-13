# Builds the client information request in French and Arabic.
#
#   python3 docs/client/build_client_pdf.py "$PWD"        (from the project root)
#
# It reads the service names and prices from src/lib/services-data.ts and
# src/lib/services-data-ar.ts, writes the two HTML files next to this script,
# and Chrome then prints each one to PDF:
#
#   "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless=new \
#     --no-pdf-header-footer --virtual-time-budget=9000 \
#     --print-to-pdf=docs/client/<name>.pdf file://$PWD/docs/client/<name>.html
import re, sys, html
root = sys.argv[1]
out = f"{root}/docs/client"

def services(path):
    s = open(path).read()
    res = []
    for p in re.split(r'\n  \{\n    slug: "', s)[1:]:
        name = re.search(r'name: "([^"]+)"', p).group(1)
        urgent = p.split('"', 1)[0] in ("ambulance", "medecin-domicile")
        pr = p[p.index('pricing: ['):]; pr = pr[:pr.index('faq: [')]
        items = re.findall(r'\{ name: "([^"]+)", price: "([^"]+)"(?:, unit: "([^"]*)")?', pr)
        res.append((name, urgent, [(n, f"{price} {unit}".strip()) for n, price, unit in items]))
    return res

FR = dict(
  lang="fr", dir="ltr", font='"IBM Plex Sans"',
  footer="MEDCARE · Que nous faut-il pour finir le site ?", page="Page", of="sur",
  tagline="Soins médicaux à domicile · Casablanca",
  title="Que nous faut-il pour finir le site ?",
  subtitle="Les contacts · Les zones · Les neuf services et leurs prix<br>Les preuves · Vos remarques",
  meta=[("Pour","la direction de MedCare"),("Comment répondre","sur ce document, ou par WhatsApp"),("Durée","30 minutes environ"),("Préparé par","Agrat Mohammed")],
  intro="Le nouveau site de MedCare est prêt. Pour l'instant, il n'affiche <b>que ce qui est sûr</b> : le numéro de téléphone, WhatsApp, l'e-mail, les neuf services, l'ouverture 24h/24 et le devis gratuit. Nous avons retiré le reste en attendant vos réponses : nombre de patients, note, témoignages, délais d'intervention. Ce document dit <b>ce qu'il nous faut</b>, ce qui est obligatoire, et à quoi chaque information servira sur le site.",
  boxes=[("informations obligatoires","Sans elles, nous ne pouvons pas mettre le site en ligne."),("services à confirmer","Pour chacun : proposé aujourd'hui ou non, et dans quelles conditions."),("prix à valider","Ceux du site sont des estimations. Corrigez-les ou barrez-les.")],
  star_note="signale une information obligatoire. Tout ce qui n'a pas de ★ est facultatif, mais chaque réponse rend le site plus précis et plus convaincant. <b>N'écrivez que ce qui est vrai aujourd'hui</b> : nous ne publions que ce qui peut être prouvé.",
  th=dict(info="Information", answer="Votre réponse", why="À quoi ça sert", must="Obligatoire", prep="Ce que vous préparez", reason="Pourquoi", yours="Votre réponse"),
  onsite="Sur le site :",
  s1=("Les contacts et la disponibilité","Tout le site mène à deux boutons : « Appeler » et « WhatsApp ». Nous devons être sûrs du numéro qui se trouve derrière chacun."),
  contacts=[
    ("Numéro d'appel principal","", "phone", ["correct","à changer"], "Le bouton « Appeler » de toutes les pages.", True),
    ("Numéro WhatsApp","", "", ["le même","un autre"], "Le bouton « WhatsApp » et les demandes préparées par le site.", True),
    ("Qui répond la nuit et le week-end ?","Une personne, une permanence, un renvoi d'appel", "", [], "Le site promet une réponse 24h/24 et 7j/7. Il faut que ce soit vrai chaque nuit.", True),
    ("Délai habituel de réponse sur WhatsApp","", "", [], "Pour dire au patient à quoi s'attendre.", False),
    ("E-mail professionnel","", "email", [], "Une adresse au nom de MedCare inspire plus confiance qu'une adresse Gmail.", False),
    ("Langues parlées au téléphone","", "", ["français","arabe","darija","amazigh","anglais"], "Le site existe en français et en arabe.", False),
    ("Réseaux sociaux","Facebook, Instagram, LinkedIn", "", [], "Liens dans le pied de page.", False),
  ],
  s2=("Les zones d'intervention","Le site annonce : « Casablanca et sa région aujourd'hui, d'autres villes bientôt ». Cochez ce qui est exact."),
  zone_th=("Zone","Couverte aujourd'hui ?","Remarque (quartiers exclus, supplément de déplacement…)"),
  zones=["Casablanca (tous les quartiers)","Mohammedia","Bouskoura","Dar Bouazza","Nouaceur","Médiouna","Berrechid","Autre : ………………………………"],
  yn=["oui","non","selon le service"],
  soon_h="Les villes à venir", soon_th=("Ville","Ouverture prévue (mois, année)","Services proposés au départ"),
  soon_note="Tant qu'une ville n'a pas de date, le site ne la nomme pas. Il dit seulement « d'autres villes bientôt ».",
  s3=("Les neuf services et leurs prix","Pour chaque service : cochez sa situation, puis corrigez les prix. La colonne « Prix sur le site » montre ce qui est affiché aujourd'hui, à titre indicatif."),
  price_note="<b>Vous préférez ne pas afficher de prix ?</b> Écrivez « sur devis » dans la dernière colonne. Le site dira alors : devis gratuit avant la visite. <span class='star'>★</span> Un service sans réponse sera retiré du site.",
  svc_choices=["proposé aujourd'hui","pas encore","à retirer du site"],
  svc_th=("Formule","Prix sur le site","Prix réel, ou « sur devis »"),
  delay_urgent="Délai habituel d'arrivée à Casablanca", delay_normal="Délai habituel pour un rendez-vous", delay_small="Seulement si vous pouvez le tenir",
  remark="Remarque",
  s4=("Les preuves de confiance","L'ancien site affichait des chiffres et des avis que personne ne pouvait vérifier. Ces éléments peuvent les remplacer, du plus utile au moins utile."),
  proofs=[
    ("La fiche Google de MedCare","Le lien, ou votre accord pour la créer","Aucune fiche MedCare n'apparaît aujourd'hui dans Google. C'est là que les familles cherchent un numéro et lisent les avis."),
    ("Trois à six témoignages de patients","Avec leur accord écrit, prénom et quartier","Les témoignages de l'ancien site étaient inventés. Ils ont été retirés."),
    ("Des photos réelles","Ambulances, équipe en tenue, matériel, locaux","Les images actuelles sont des illustrations. Une photo de votre ambulance vaut plus que toutes."),
    ("Les qualifications des soignants","Diplômes, inscriptions à l'Ordre : copies ou numéros","Le site écrit « soignants diplômés ». Il faut pouvoir le montrer si on vous le demande."),
    ("Les assurances et mutuelles acceptées","CNSS, CNOPS, assurances privées, ou aucune","Les familles posent la question avant de réserver."),
    ("Les moyens de paiement","Espèces, carte, virement","Évite une mauvaise surprise au moment de payer."),
    ("Des chiffres que vous pouvez prouver","Patients suivis par an, nombre de soignants, nombre d'ambulances","N'indiquez que des chiffres exacts, même s'ils sont modestes."),
    ("Vos partenaires","Cliniques, laboratoires, avec leur accord","Pour les prélèvements et les transferts, le patient veut savoir où vont ses analyses."),
  ],
  s5=("Les mentions légales et les données personnelles","Le site reçoit des messages qui parlent de santé. Ces pages n'existent pas encore."),
  legal=[
    ("Le nom du directeur de la publication","","Page des mentions légales."),
    ("Le nom de domaine et son propriétaire","Exemple : medcare.ma","Le domaine doit appartenir à MedCare, pas à un prestataire."),
    ("La déclaration à la CNDP","Numéro, si elle existe déjà (loi 09-08)","À vérifier avec votre conseil juridique avant la mise en ligne."),
    ("Votre politique de confidentialité","Ou votre accord pour qu'on la rédige avec vous","Dit au patient ce que deviennent ses messages."),
  ],
  s6=("L'assistant en ligne","La bulle de discussion en bas de l'écran répond aux questions sur les services. Elle ne peut ni envoyer une ambulance ni enregistrer un rendez-vous."),
  bot_q="On le garde ?", bot_choices=["Oui, avec une clé au nom de MedCare (service Groq)","Non, on le retire : le téléphone et WhatsApp suffisent"],
  s7=("Votre avis et vos remarques","Vous avez vu le nouveau site. Dites-nous ce que vous en pensez, même en deux mots."),
  opinion=[
    ("Votre avis d'ensemble","",["Il me convient","Quelques retouches","À revoir"],1),
    ("Ce qui vous plaît","",[],2),
    ("Ce qu'il faut changer","Textes, couleurs, photos, ordre des rubriques",[],3),
    ("Ce qui manque","",[],2),
    ("Autres remarques","",[],3),
  ],
  end=[("Le minimum pour mettre en ligne.","Les numéros confirmés, la personne qui répond la nuit, les zones couvertes, et pour chaque service : proposé ou non, avec un prix validé ou « sur devis »."),
       ("S'il faut choisir par quoi commencer.","La fiche Google, puis quelques photos de votre équipe et de vos ambulances.")],
)

AR = dict(
  lang="ar", dir="rtl", font='"IBM Plex Sans Arabic", "IBM Plex Sans"',
  footer="MEDCARE · ماذا نحتاج لإتمام الموقع؟", page="صفحة", of="من",
  tagline="رعاية طبية في المنزل · الدار البيضاء",
  title="ماذا نحتاج لإتمام الموقع؟",
  subtitle="وسائل الاتصال · مناطق العمل · الخدمات التسع وأثمنتها<br>ما يثبت الثقة · ملاحظاتكم",
  meta=[("إلى","إدارة ميدكير"),("طريقة الجواب","على هذه الوثيقة، أو عبر واتساب"),("المدة","حوالي 30 دقيقة"),("أعدّه","Agrat Mohammed")],
  intro="الموقع الجديد لميدكير جاهز. وهو لا يعرض حالياً <b>إلا ما هو مؤكد</b>: رقم الهاتف، واتساب، البريد الإلكتروني، الخدمات التسع، العمل 24 ساعة على 24، ومعرفة الثمن مجاناً قبل الزيارة. أما الباقي فحذفناه في انتظار أجوبتكم: عدد المرضى، التقييم، الشهادات، ومدة الوصول. هذه الوثيقة تبيّن <b>ما نحتاج إليه</b>، وما هو إجباري منه، وفيمَ ستُستعمل كل معلومة في الموقع.",
  boxes=[("معلومة إجبارية","بدونها لا نستطيع نشر الموقع."),("خدمات تحتاج إلى تأكيد","لكل خدمة: هل تُقدَّم اليوم أم لا، وبأي شروط."),("ثمناً يحتاج إلى تأكيد","أثمنة الموقع تقديرية. صحّحوها أو اشطبوها.")],
  star_note="تعني معلومة إجبارية. كل ما ليس عليه ★ اختياري، لكن كل جواب يجعل الموقع أدقّ وأكثر إقناعاً. <b>اكتبوا فقط ما هو صحيح اليوم</b>: لا ننشر إلا ما يمكن إثباته.",
  th=dict(info="المعلومة", answer="جوابكم", why="فيمَ تُستعمل", must="إجباري", prep="ما تحضّرونه", reason="لماذا", yours="جوابكم"),
  onsite="في الموقع:",
  s1=("وسائل الاتصال وأوقات العمل","كل الموقع يقود إلى زرّين: « اتصال » و« واتساب ». نحتاج إلى التأكد من الرقم الذي يوجد خلف كل واحد منهما."),
  contacts=[
    ("رقم الهاتف الرئيسي","", "phone", ["صحيح","يجب تغييره"], "زر « اتصال » في كل الصفحات.", True),
    ("رقم واتساب","", "", ["الرقم نفسه","رقم آخر"], "زر « واتساب » والطلبات التي يحضّرها الموقع.", True),
    ("من يجيب ليلاً وفي نهاية الأسبوع؟","شخص واحد، مداومة، أو تحويل المكالمات", "", [], "الموقع يَعِد بالجواب 24 ساعة على 24، 7 أيام على 7. يجب أن يكون ذلك صحيحاً كل ليلة.", True),
    ("المدة المعتادة للجواب على واتساب","", "", [], "ليعرف المريض ما ينتظره.", False),
    ("البريد الإلكتروني المهني","", "email", [], "عنوان باسم ميدكير يبعث على الثقة أكثر من عنوان Gmail.", False),
    ("اللغات المستعملة في الهاتف","", "", ["الفرنسية","العربية","الدارجة","الأمازيغية","الإنجليزية"], "الموقع متوفر بالفرنسية والعربية.", False),
    ("شبكات التواصل الاجتماعي","فيسبوك، إنستغرام، لينكد إن", "", [], "روابط في أسفل الموقع.", False),
  ],
  s2=("مناطق العمل","الموقع يقول: « الدار البيضاء ونواحيها اليوم، ومدن أخرى قريباً ». ضعوا علامة على ما هو صحيح."),
  zone_th=("المنطقة","هل تعملون فيها اليوم؟","ملاحظة (أحياء مستثناة، مصاريف تنقل إضافية…)"),
  zones=["الدار البيضاء (كل الأحياء)","المحمدية","بوسكورة","دار بوعزة","النواصر","مديونة","برشيد","أخرى: ………………………………"],
  yn=["نعم","لا","حسب الخدمة"],
  soon_h="المدن القادمة", soon_th=("المدينة","تاريخ الانطلاق المتوقع (الشهر، السنة)","الخدمات المقترحة في البداية"),
  soon_note="ما دامت المدينة بلا تاريخ، فالموقع لا يذكر اسمها. يقول فقط « مدن أخرى قريباً ».",
  s3=("الخدمات التسع وأثمنتها","لكل خدمة: ضعوا علامة على وضعها، ثم صحّحوا الأثمنة. عمود « الثمن في الموقع » يبيّن ما يُعرض اليوم، على سبيل الإشارة."),
  price_note="<b>تفضّلون عدم عرض الأثمنة؟</b> اكتبوا « حسب الطلب » في العمود الأخير. وسيقول الموقع حينها: تعرفون الثمن قبل الزيارة، مجاناً. <span class='star'>★</span> كل خدمة بلا جواب ستُحذف من الموقع.",
  svc_choices=["تُقدَّم اليوم","ليس بعد","تُحذف من الموقع"],
  svc_th=("الصيغة","الثمن في الموقع","الثمن الحقيقي، أو « حسب الطلب »"),
  delay_urgent="المدة المعتادة للوصول داخل الدار البيضاء", delay_normal="المدة المعتادة للحصول على موعد", delay_small="فقط إذا كنتم قادرين على الالتزام بها",
  remark="ملاحظة",
  s4=("ما يثبت الثقة","كان الموقع القديم يعرض أرقاماً وآراء لا يستطيع أحد التحقق منها. هذه العناصر يمكن أن تعوّضها، من الأكثر فائدة إلى الأقل."),
  proofs=[
    ("صفحة ميدكير على Google","الرابط، أو موافقتكم على إنشائها","لا تظهر اليوم أي صفحة لميدكير في Google. وهناك تبحث العائلات عن رقم الهاتف وتقرأ الآراء."),
    ("من ثلاث إلى ست شهادات لمرضى","بموافقتهم المكتوبة، مع الاسم الشخصي والحي","شهادات الموقع القديم كانت مختلَقة، وقد حُذفت."),
    ("صور حقيقية","سيارات الإسعاف، الفريق بالزي المهني، المعدات، المقر","الصور الحالية توضيحية فقط. صورة واحدة لسيارة إسعافكم أفضل منها جميعاً."),
    ("مؤهلات الطاقم","الدبلومات، التسجيل في الهيئة: نسخ أو أرقام","الموقع يكتب « طاقم مؤهل ». يجب أن تستطيعوا إثبات ذلك إذا طُلب منكم."),
    ("التأمينات والتعاضديات المقبولة","CNSS، CNOPS، تأمينات خاصة، أو لا شيء","تسأل العائلات عن ذلك قبل الحجز."),
    ("وسائل الأداء","نقداً، بالبطاقة، بالتحويل","لتفادي مفاجأة غير سارّة عند الأداء."),
    ("أرقام تستطيعون إثباتها","عدد المرضى في السنة، عدد أفراد الطاقم، عدد سيارات الإسعاف","اكتبوا الأرقام الصحيحة فقط، ولو كانت صغيرة."),
    ("شركاؤكم","مصحات، مختبرات، بموافقتهم","في التحاليل والنقل، يريد المريض أن يعرف إلى أين تذهب تحاليله."),
  ],
  s5=("البيانات القانونية والمعطيات الشخصية","الموقع يتوصل برسائل تتحدث عن الصحة. وهذه الصفحات غير موجودة بعد."),
  legal=[
    ("اسم مدير النشر","","صفحة البيانات القانونية."),
    ("اسم النطاق ومالكه","مثال: medcare.ma","يجب أن يكون النطاق في ملكية ميدكير، لا في ملكية مزوّد الخدمة."),
    ("التصريح لدى اللجنة الوطنية لمراقبة حماية المعطيات (CNDP)","الرقم، إن وُجد (القانون 09-08)","يُستحسن التأكد منه مع مستشاركم القانوني قبل النشر."),
    ("سياسة الخصوصية","أو موافقتكم على أن نحرّرها معكم","تخبر المريض بمآل رسائله."),
  ],
  s6=("المساعد الآلي في الموقع","دائرة المحادثة أسفل الشاشة تجيب عن الأسئلة المتعلقة بالخدمات. لكنها لا تستطيع إرسال سيارة إسعاف ولا تسجيل موعد."),
  bot_q="هل نحتفظ به؟", bot_choices=["نعم، بمفتاح باسم ميدكير (خدمة Groq)","لا، نحذفه: الهاتف وواتساب يكفيان"],
  s7=("رأيكم وملاحظاتكم","اطّلعتم على الموقع الجديد. أخبرونا برأيكم فيه، ولو في كلمتين."),
  opinion=[
    ("رأيكم العام","",["يناسبني","يحتاج إلى بعض التعديلات","يجب إعادة النظر فيه"],1),
    ("ما أعجبكم","",[],2),
    ("ما يجب تغييره","النصوص، الألوان، الصور، ترتيب الفقرات",[],3),
    ("ما ينقص","",[],2),
    ("ملاحظات أخرى","",[],3),
  ],
  end=[("الحدّ الأدنى لنشر الموقع.","الأرقام المؤكدة، من يجيب ليلاً، المناطق التي تعملون فيها، ولكل خدمة: تُقدَّم أم لا، مع ثمن مؤكد أو « حسب الطلب »."),
       ("إن كان لا بد من اختيار ما نبدأ به.","صفحة Google أولاً، ثم بعض الصور لفريقكم ولسيارات الإسعاف.")],
)

CSS = '''
  @page { size: A4; margin: 16mm 15mm 18mm;
    @bottom-left { content: "__FOOT_START__"; font: __FOOT_START_W__ 8pt __FONT__, sans-serif; color: __FOOT_START_C__; border-top: 0.6pt solid #bbb; padding-top: 3mm; }
    @bottom-right { content: "__FOOT_END__"; font: __FOOT_END_W__ 8pt __FONT__, sans-serif; color: __FOOT_END_C__; border-top: 0.6pt solid #bbb; padding-top: 3mm; } }
  * { box-sizing: border-box; }
  html { font: 400 9.6pt/1.5 __FONT__, system-ui, sans-serif; color: #111; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
  [dir=rtl] { line-height: 1.6; }
  body { margin: 0; } p { margin: 0; }
  .mono { font-family: "IBM Plex Mono", ui-monospace, monospace; font-size: 0.93em; }
  .ltr { direction: ltr; unicode-bidi: isolate; display: inline-block; }
  .star { color: #c8102e; font-size: 1.15em; line-height: 1; } .dash { color: #aaa; }
  header { display: flex; justify-content: space-between; align-items: flex-end; gap: 10mm; padding-bottom: 5mm; border-bottom: 1.6pt solid #111; }
  .brand { display: flex; align-items: center; gap: 4mm; direction: ltr; }
  .brand img.mark { height: 15mm; } .brand img.word { height: 7.5mm; display: block; }
  .brand small { display: block; margin-top: 1.6mm; color: #666; font-size: 8.4pt; }
  [dir=rtl] .brand small { direction: rtl; text-align: left; }
  .doc-title { text-align: end; }
  .doc-title h1 { margin: 0 0 1.5mm; font-size: 16pt; font-weight: 700; }
  .doc-title p { color: #666; font-size: 8.8pt; line-height: 1.5; }
  .meta { display: flex; justify-content: space-between; gap: 5mm; padding: 3mm 0; border-bottom: 0.6pt solid #bbb; font-size: 8.4pt; white-space: nowrap; }
  .meta span { color: #777; margin-inline-end: 1.5mm; } .meta b { font-weight: 600; }
  .intro { margin-top: 4mm; font-size: 9.6pt; }
  .boxes { display: grid; grid-template-columns: repeat(3, 1fr); gap: 4mm; margin-top: 4mm; }
  .box { border: 0.8pt solid #111; padding: 2.4mm 4mm 3mm; }
  .box .n { font-size: 18pt; font-weight: 700; line-height: 1.15; }
  .box b { display: block; font-weight: 600; margin-top: 0.5mm; } .box p { color: #666; font-size: 8.6pt; margin-top: 1mm; }
  .note { margin-top: 4mm; background: #f1f1f1; border-inline-start: 2.4pt solid #111; padding: 2.8mm 4mm; font-size: 9.2pt; break-inside: avoid; }
  .notes2 { display: grid; grid-template-columns: 1fr 1fr; gap: 4mm; margin-top: 5mm; } .notes2 .note { margin-top: 0; }
  h2 { display: flex; align-items: center; gap: 2.6mm; margin: 6.5mm 0 1mm; font-size: 12.5pt; font-weight: 700; break-after: avoid; }
  h2 .num { display: inline-grid; place-items: center; min-width: 5.6mm; height: 5.6mm; padding: 0 1mm; border: 0.9pt solid #111; font-size: 8.6pt; font-weight: 600; line-height: 1; }
  h2 + .sub { color: #666; font-size: 8.9pt; margin-bottom: 2.6mm; break-after: avoid; }
  h3 { margin: 5mm 0 1.6mm; font-size: 9.6pt; font-weight: 700; break-after: avoid; }
  table { width: 100%; border-collapse: collapse; margin-top: 2mm; font-size: 9pt; }
  th, td { border: 0.6pt solid #c6c6c6; padding: 1.9mm 2.8mm; text-align: start; vertical-align: top; }
  thead th { background: #ededed; font-weight: 600; font-size: 8.8pt; }
  tr { break-inside: avoid; }
  td.i, th.i { width: 7mm; text-align: center; font-weight: 600; }
  td.c { text-align: center; width: 17mm; vertical-align: middle; }
  td.label b { display: block; font-weight: 600; } td.label small { display: block; color: #777; font-size: 8pt; margin-top: 0.4mm; }
  td.fill { width: 36%; } td.fill .known { display: block; color: #555; font-size: 8.2pt; margin-bottom: 1mm; }
  .line { display: block; border-bottom: 0.6pt dotted #888; height: 5.6mm; }
  .box-check { display: inline-block; width: 3.3mm; height: 3.3mm; border: 0.8pt solid #111; vertical-align: -0.5mm; margin-inline-end: 1.4mm; }
  .choices { display: flex; flex-wrap: wrap; gap: 1.5mm 5mm; font-size: 8.9pt; }
  .zones th:nth-child(1) { width: 25%; } .zones th:nth-child(2) { width: 37%; }
  .keep { break-inside: avoid; }
  .service { break-inside: avoid; margin-top: 5mm; }
  .service-head { display: flex; justify-content: space-between; align-items: baseline; gap: 6mm; border-bottom: 0.9pt solid #111; padding-bottom: 1.4mm; }
  .service-head b { font-size: 10.2pt; }
  .service table { margin-top: 0; table-layout: fixed; }
  .service th:nth-child(1) { width: 36%; } .service th:nth-child(2) { width: 34%; }
  .ask td.label { width: 34mm; white-space: nowrap; }
  .opinion td.label { width: 32%; }
  .page-break { break-before: page; }
'''

def esc(x): return html.escape(x, quote=False)
def choices(items): return '<span class="choices">' + ''.join(f'<span><i class="box-check"></i>{esc(c)}</span>' for c in items) + '</span>'
def lines(n): return '<span class="line"></span>' * n
STAR, DASH = '<span class="star">★</span>', '<span class="dash">—</span>'

def build(L, svcs):
    rtl = L["dir"] == "rtl"
    foot_title, foot_page = L["footer"], f'{L["page"]} " counter(page) " {L["of"]} " counter(pages) "'
    css = CSS.replace("__FONT__", L["font"])
    # In a right-to-left document the page number sits on the left.
    start = ("__TITLE__", "400", "#666"); end = ("__PAGE__", "600", "#222")
    left, right = (end, start) if rtl else (start, end)
    def content(kind): return foot_title if kind == "__TITLE__" else None
    css = css.replace('content: "__FOOT_START__"', 'content: "%s"' % foot_title if left[0]=="__TITLE__" else 'content: "%s"' % foot_page)
    css = css.replace('content: "__FOOT_END__"', 'content: "%s"' % foot_title if right[0]=="__TITLE__" else 'content: "%s"' % foot_page)
    css = css.replace("__FOOT_START_W__", left[1]).replace("__FOOT_START_C__", left[2]).replace("__FOOT_END_W__", right[1]).replace("__FOOT_END_C__", right[2])
    th = L["th"]; h = []; n = [0]
    def section(pair, brk=False):
        n[0] += 1
        h.append(f'<h2{" class=page-break" if brk else ""}><span class="num">{n[0]}</span>{esc(pair[0])}</h2><p class="sub">{esc(pair[1])}</p>')
    h.append(f'''<header><div class="brand"><img class="mark" src="../../public/medcare3d.webp" alt=""><div><img class="word" src="../../public/medcare-logo.png" alt="MedCare"><small>{esc(L["tagline"])}</small></div></div>
<div class="doc-title"><h1>{esc(L["title"])}</h1><p>{L["subtitle"]}</p></div></header>''')
    h.append('<div class="meta">' + ''.join(f'<div><span>{esc(a)}</span><b>{esc(b)}</b></div>' for a, b in L["meta"]) + '</div>')
    h.append(f'<p class="intro">{L["intro"]}</p>')
    stars = sum(1 for c in L["contacts"] if c[5]) + 1 + len(svcs)
    prices = sum(len(s[2]) for s in svcs)
    nums = [stars, len(svcs), prices]
    h.append('<div class="boxes">' + ''.join(f'<div class="box"><div class="n">{nums[i]}</div><b>{esc(b)}</b><p>{esc(p)}</p></div>' for i, (b, p) in enumerate(L["boxes"])) + '</div>')
    h.append(f'<p class="note">{STAR} {L["star_note"]}</p>')

    section(L["s1"])
    rows = []
    for i, (label, small, known, ch, why, must) in enumerate(L["contacts"], 1):
        k = ''
        if known == "phone": k = f'<span class="known">{esc(L["onsite"])} <span class="mono ltr">06 26 21 65 68</span></span>'
        if known == "email": k = f'<span class="known">{esc(L["onsite"])} <span class="mono ltr">doccaremed@gmail.com</span></span>'
        fill = k + (choices(ch) if ch else '') + ('' if (ch and len(ch) > 2) else lines(2 if (not ch and not known and small) else 1))
        rows.append(f'<tr><td class="i">{i}</td><td class="label"><b>{esc(label)}</b>{f"<small>{esc(small)}</small>" if small else ""}</td><td class="fill">{fill}</td><td>{esc(why)}</td><td class="c">{STAR if must else DASH}</td></tr>')
    h.append(f'<table><thead><tr><th class="i"></th><th>{th["info"]}</th><th>{th["answer"]}</th><th>{th["why"]}</th><th>{th["must"]}</th></tr></thead><tbody>{"".join(rows)}</tbody></table>')

    section(L["s2"])
    zt = L["zone_th"]
    rows = [f'<tr><td class="label"><b>{esc(z)}</b></td><td>{choices(L["yn"])}</td><td>{lines(1)}</td><td class="c">{STAR if i == 0 else DASH}</td></tr>' for i, z in enumerate(L["zones"])]
    h.append(f'<table class="zones"><thead><tr><th>{zt[0]}</th><th>{zt[1]}</th><th>{zt[2]}</th><th>{th["must"]}</th></tr></thead><tbody>{"".join(rows)}</tbody></table>')
    st = L["soon_th"]
    h.append(f'<div class="keep"><h3>{esc(L["soon_h"])}</h3><table><thead><tr><th style="width:26%">{st[0]}</th><th>{st[1]}</th><th>{st[2]}</th></tr></thead><tbody>' + (f'<tr><td>{lines(1)}</td><td>{lines(1)}</td><td>{lines(1)}</td></tr>' * 3) + '</tbody></table>')
    h.append(f'<p class="note">{esc(L["soon_note"])}</p></div>')

    section(L["s3"], brk=True)
    h.append(f'<p class="note">{L["price_note"]}</p>')
    sv = L["svc_th"]
    for i, (name, urgent, items) in enumerate(svcs, 1):
        rows = ''.join(f'<tr><td class="label"><b>{esc(a)}</b></td><td class="price{"" if rtl else " mono"}">{esc(b)}</td><td>{lines(1)}</td></tr>' for a, b in items)
        rows += f'<tr><td class="label"><b>{esc(L["delay_urgent"] if urgent else L["delay_normal"])}</b><small>{esc(L["delay_small"])}</small></td><td colspan="2">{lines(1)}</td></tr>'
        rows += f'<tr><td class="label"><b>{esc(L["remark"])}</b></td><td colspan="2">{lines(1)}</td></tr>'
        h.append(f'<div class="service"><div class="service-head"><b><span class="ltr">{n[0]}.{i}</span>&nbsp; {esc(name)} {STAR}</b>{choices(L["svc_choices"])}</div><table><thead><tr><th>{sv[0]}</th><th>{sv[1]}</th><th>{sv[2]}</th></tr></thead><tbody>{rows}</tbody></table></div>')

    def checklist(pair, items, brk=False):
        section(pair, brk)
        rows = ''.join(f'<tr><td class="i"><i class="box-check" style="margin:0"></i></td><td class="label"><b>{esc(a)}</b>{f"<small>{esc(b)}</small>" if b else ""}</td><td>{esc(c)}</td></tr>' for a, b, c in items)
        h.append(f'<table><thead><tr><th class="i"></th><th style="width:38%">{th["prep"]}</th><th>{th["reason"]}</th></tr></thead><tbody>{rows}</tbody></table>')
    checklist(L["s4"], L["proofs"], brk=True)
    checklist(L["s5"], L["legal"])

    section(L["s6"])
    h.append(f'<table class="ask"><tbody><tr><td class="label"><b>{esc(L["bot_q"])}</b></td><td>{choices(L["bot_choices"])}</td></tr></tbody></table>')

    section(L["s7"])
    rows = ''.join(f'<tr><td class="label"><b>{esc(a)}</b>{f"<small>{esc(b)}</small>" if b else ""}</td><td>{choices(ch) if ch else ""}{lines(k)}</td></tr>' for a, b, ch, k in L["opinion"])
    h.append(f'<table class="opinion"><thead><tr><th>{th["info"]}</th><th>{th["yours"]}</th></tr></thead><tbody>{rows}</tbody></table>')
    h.append('<div class="notes2">' + ''.join(f'<p class="note"><b>{esc(a)}</b> {esc(b)}</p>' for a, b in L["end"]) + '</div>')

    return f'''<!doctype html>
<html lang="{L["lang"]}" dir="{L["dir"]}">
<head>
<meta charset="utf-8">
<title>MedCare · {esc(L["title"])}</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500&family=IBM+Plex+Sans:wght@400;500;600;700&family=IBM+Plex+Sans+Arabic:wght@400;500;600;700&display=swap" rel="stylesheet">
<style>{css}</style>
</head>
<body>
{chr(10).join(h)}
</body>
</html>
'''

open(f"{out}/medcare-informations-a-fournir.html", "w").write(build(FR, services(f"{root}/src/lib/services-data.ts")))
open(f"{out}/medcare-informations-a-fournir-ar.html", "w").write(build(AR, services(f"{root}/src/lib/services-data-ar.ts")))
print("ok")
