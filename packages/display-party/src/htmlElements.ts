import { View, ViewElement, SpecialElements, SpecialElementBuilder, SpecialAttributes } from "./view.js";
import { StoreMessage } from "state-party";

export interface AriaAttributes {
    activedescendant?: string;
    atomic?: string;
    autocomplete?: string;
    busy?: string;
    checked?: string;
    colcount?: string;
    colindex?: string;
    colspan?: string;
    controls?: string;
    current?: string;
    describedby?: string;
    details?: string;
    disabled?: string;
    dropeffect?: string;
    errormessage?: string;
    expanded?: string;
    flowto?: string;
    grabbed?: string;
    haspopup?: string;
    hidden?: string;
    invalid?: string;
    keyshortcuts?: string;
    label?: string;
    labelledby?: string;
    level?: string;
    live?: string;
    modal?: string;
    multiline?: string;
    multiselectable?: string;
    orientation?: string;
    owns?: string;
    placeholder?: string;
    posinset?: string;
    pressed?: string;
    readonly?: string;
    relevant?: string;
    required?: string;
    roledescription?: string;
    rowcount?: string;
    rowindex?: string;
    rowspan?: string;
    selected?: string;
    setsize?: string;
    sort?: string;
    valuemax?: string;
    valuemin?: string;
    valuenow?: string;
    valuetext?: string;
}

export interface GlobalAttributes {
    accesskey(value: string): this;
    autocapitalize(value: string): this;
    autofocus(value: boolean): this;
    contenteditable(value: string): this;
    dir(value: string): this;
    draggable(value: string): this;
    enterkeyhint(value: string): this;
    hidden(value: string): this;
    id(value: string): this;
    inert(value: boolean): this;
    inputmode(value: string): this;
    is(value: string): this;
    itemid(value: string): this;
    itemprop(value: string): this;
    itemref(value: string): this;
    itemscope(value: boolean): this;
    itemtype(value: string): this;
    lang(value: string): this;
    nonce(value: string): this;
    popover(value: string): this;
    slot(value: string): this;
    spellcheck(value: string): this;
    style(value: string): this;
    tabindex(value: string): this;
    title(value: string): this;
    translate(value: string): this;
    role(value: string): this;
}

export interface ElementEvents {
    abort?: <E extends Event>(evt: E) => StoreMessage<any>;
    afterprint?: <E extends Event>(evt: E) => StoreMessage<any>;
    auxclick?: <E extends Event>(evt: E) => StoreMessage<any>;
    beforematch?: <E extends Event>(evt: E) => StoreMessage<any>;
    beforeprint?: <E extends Event>(evt: E) => StoreMessage<any>;
    beforeunload?: <E extends Event>(evt: E) => StoreMessage<any>;
    blur?: <E extends Event>(evt: E) => StoreMessage<any>;
    cancel?: <E extends Event>(evt: E) => StoreMessage<any>;
    canplay?: <E extends Event>(evt: E) => StoreMessage<any>;
    canplaythrough?: <E extends Event>(evt: E) => StoreMessage<any>;
    change?: <E extends Event>(evt: E) => StoreMessage<any>;
    click?: <E extends Event>(evt: E) => StoreMessage<any>;
    close?: <E extends Event>(evt: E) => StoreMessage<any>;
    contextlost?: <E extends Event>(evt: E) => StoreMessage<any>;
    contextmenu?: <E extends Event>(evt: E) => StoreMessage<any>;
    contextrestored?: <E extends Event>(evt: E) => StoreMessage<any>;
    copy?: <E extends Event>(evt: E) => StoreMessage<any>;
    cuechange?: <E extends Event>(evt: E) => StoreMessage<any>;
    cut?: <E extends Event>(evt: E) => StoreMessage<any>;
    dblclick?: <E extends Event>(evt: E) => StoreMessage<any>;
    drag?: <E extends Event>(evt: E) => StoreMessage<any>;
    dragend?: <E extends Event>(evt: E) => StoreMessage<any>;
    dragenter?: <E extends Event>(evt: E) => StoreMessage<any>;
    dragleave?: <E extends Event>(evt: E) => StoreMessage<any>;
    dragover?: <E extends Event>(evt: E) => StoreMessage<any>;
    dragstart?: <E extends Event>(evt: E) => StoreMessage<any>;
    drop?: <E extends Event>(evt: E) => StoreMessage<any>;
    durationchange?: <E extends Event>(evt: E) => StoreMessage<any>;
    emptied?: <E extends Event>(evt: E) => StoreMessage<any>;
    ended?: <E extends Event>(evt: E) => StoreMessage<any>;
    error?: <E extends Event>(evt: E) => StoreMessage<any>;
    focus?: <E extends Event>(evt: E) => StoreMessage<any>;
    formdata?: <E extends Event>(evt: E) => StoreMessage<any>;
    hashchange?: <E extends Event>(evt: E) => StoreMessage<any>;
    input?: <E extends Event>(evt: E) => StoreMessage<any>;
    invalid?: <E extends Event>(evt: E) => StoreMessage<any>;
    keydown?: <E extends Event>(evt: E) => StoreMessage<any>;
    keypress?: <E extends Event>(evt: E) => StoreMessage<any>;
    keyup?: <E extends Event>(evt: E) => StoreMessage<any>;
    languagechange?: <E extends Event>(evt: E) => StoreMessage<any>;
    load?: <E extends Event>(evt: E) => StoreMessage<any>;
    loadeddata?: <E extends Event>(evt: E) => StoreMessage<any>;
    loadedmetadata?: <E extends Event>(evt: E) => StoreMessage<any>;
    loadstart?: <E extends Event>(evt: E) => StoreMessage<any>;
    message?: <E extends Event>(evt: E) => StoreMessage<any>;
    messageerror?: <E extends Event>(evt: E) => StoreMessage<any>;
    mousedown?: <E extends Event>(evt: E) => StoreMessage<any>;
    mouseenter?: <E extends Event>(evt: E) => StoreMessage<any>;
    mouseleave?: <E extends Event>(evt: E) => StoreMessage<any>;
    mousemove?: <E extends Event>(evt: E) => StoreMessage<any>;
    mouseout?: <E extends Event>(evt: E) => StoreMessage<any>;
    mouseover?: <E extends Event>(evt: E) => StoreMessage<any>;
    mouseup?: <E extends Event>(evt: E) => StoreMessage<any>;
    offline?: <E extends Event>(evt: E) => StoreMessage<any>;
    online?: <E extends Event>(evt: E) => StoreMessage<any>;
    pagehide?: <E extends Event>(evt: E) => StoreMessage<any>;
    pageshow?: <E extends Event>(evt: E) => StoreMessage<any>;
    paste?: <E extends Event>(evt: E) => StoreMessage<any>;
    pause?: <E extends Event>(evt: E) => StoreMessage<any>;
    play?: <E extends Event>(evt: E) => StoreMessage<any>;
    playing?: <E extends Event>(evt: E) => StoreMessage<any>;
    popstate?: <E extends Event>(evt: E) => StoreMessage<any>;
    progress?: <E extends Event>(evt: E) => StoreMessage<any>;
    ratechange?: <E extends Event>(evt: E) => StoreMessage<any>;
    rejectionhandled?: <E extends Event>(evt: E) => StoreMessage<any>;
    reset?: <E extends Event>(evt: E) => StoreMessage<any>;
    resize?: <E extends Event>(evt: E) => StoreMessage<any>;
    scroll?: <E extends Event>(evt: E) => StoreMessage<any>;
    scrollend?: <E extends Event>(evt: E) => StoreMessage<any>;
    securitypolicyviolation?: <E extends Event>(evt: E) => StoreMessage<any>;
    seeked?: <E extends Event>(evt: E) => StoreMessage<any>;
    seeking?: <E extends Event>(evt: E) => StoreMessage<any>;
    select?: <E extends Event>(evt: E) => StoreMessage<any>;
    slotchange?: <E extends Event>(evt: E) => StoreMessage<any>;
    stalled?: <E extends Event>(evt: E) => StoreMessage<any>;
    storage?: <E extends Event>(evt: E) => StoreMessage<any>;
    submit?: <E extends Event>(evt: E) => StoreMessage<any>;
    suspend?: <E extends Event>(evt: E) => StoreMessage<any>;
    timeupdate?: <E extends Event>(evt: E) => StoreMessage<any>;
    toggle?: <E extends Event>(evt: E) => StoreMessage<any>;
    unhandledrejection?: <E extends Event>(evt: E) => StoreMessage<any>;
    unload?: <E extends Event>(evt: E) => StoreMessage<any>;
    volumechange?: <E extends Event>(evt: E) => StoreMessage<any>;
    waiting?: <E extends Event>(evt: E) => StoreMessage<any>;
    wheel?: <E extends Event>(evt: E) => StoreMessage<any>;
}

export interface ViewBuilder extends SpecialElementBuilder {
    a(builder?: (element: ViewElement<AElementAttributes>) => void): View;
    abbr(builder?: (element: ViewElement<AbbrElementAttributes>) => void): View;
    acronym(builder?: (element: ViewElement<AcronymElementAttributes>) => void): View;
    address(builder?: (element: ViewElement<AddressElementAttributes>) => void): View;
    applet(builder?: (element: ViewElement<AppletElementAttributes>) => void): View;
    area(builder?: (element: ViewElement<AreaElementAttributes>) => void): View;
    article(builder?: (element: ViewElement<ArticleElementAttributes>) => void): View;
    aside(builder?: (element: ViewElement<AsideElementAttributes>) => void): View;
    audio(builder?: (element: ViewElement<AudioElementAttributes>) => void): View;
    b(builder?: (element: ViewElement<BElementAttributes>) => void): View;
    base(builder?: (element: ViewElement<BaseElementAttributes>) => void): View;
    basefont(builder?: (element: ViewElement<BasefontElementAttributes>) => void): View;
    bdi(builder?: (element: ViewElement<BdiElementAttributes>) => void): View;
    bdo(builder?: (element: ViewElement<BdoElementAttributes>) => void): View;
    bgsound(builder?: (element: ViewElement<BgsoundElementAttributes>) => void): View;
    big(builder?: (element: ViewElement<BigElementAttributes>) => void): View;
    blink(builder?: (element: ViewElement<BlinkElementAttributes>) => void): View;
    blockquote(builder?: (element: ViewElement<BlockquoteElementAttributes>) => void): View;
    body(builder?: (element: ViewElement<BodyElementAttributes>) => void): View;
    br(builder?: (element: ViewElement<BrElementAttributes>) => void): View;
    button(builder?: (element: ViewElement<ButtonElementAttributes>) => void): View;
    canvas(builder?: (element: ViewElement<CanvasElementAttributes>) => void): View;
    caption(builder?: (element: ViewElement<CaptionElementAttributes>) => void): View;
    center(builder?: (element: ViewElement<CenterElementAttributes>) => void): View;
    cite(builder?: (element: ViewElement<CiteElementAttributes>) => void): View;
    code(builder?: (element: ViewElement<CodeElementAttributes>) => void): View;
    col(builder?: (element: ViewElement<ColElementAttributes>) => void): View;
    colgroup(builder?: (element: ViewElement<ColgroupElementAttributes>) => void): View;
    command(builder?: (element: ViewElement<CommandElementAttributes>) => void): View;
    content(builder?: (element: ViewElement<ContentElementAttributes>) => void): View;
    data(builder?: (element: ViewElement<DataElementAttributes>) => void): View;
    datalist(builder?: (element: ViewElement<DatalistElementAttributes>) => void): View;
    dd(builder?: (element: ViewElement<DdElementAttributes>) => void): View;
    del(builder?: (element: ViewElement<DelElementAttributes>) => void): View;
    details(builder?: (element: ViewElement<DetailsElementAttributes>) => void): View;
    dfn(builder?: (element: ViewElement<DfnElementAttributes>) => void): View;
    dialog(builder?: (element: ViewElement<DialogElementAttributes>) => void): View;
    dir(builder?: (element: ViewElement<DirElementAttributes>) => void): View;
    div(builder?: (element: ViewElement<DivElementAttributes>) => void): View;
    dl(builder?: (element: ViewElement<DlElementAttributes>) => void): View;
    dt(builder?: (element: ViewElement<DtElementAttributes>) => void): View;
    element(builder?: (element: ViewElement<ElementElementAttributes>) => void): View;
    em(builder?: (element: ViewElement<EmElementAttributes>) => void): View;
    embed(builder?: (element: ViewElement<EmbedElementAttributes>) => void): View;
    fieldset(builder?: (element: ViewElement<FieldsetElementAttributes>) => void): View;
    figcaption(builder?: (element: ViewElement<FigcaptionElementAttributes>) => void): View;
    figure(builder?: (element: ViewElement<FigureElementAttributes>) => void): View;
    font(builder?: (element: ViewElement<FontElementAttributes>) => void): View;
    footer(builder?: (element: ViewElement<FooterElementAttributes>) => void): View;
    form(builder?: (element: ViewElement<FormElementAttributes>) => void): View;
    frame(builder?: (element: ViewElement<FrameElementAttributes>) => void): View;
    frameset(builder?: (element: ViewElement<FramesetElementAttributes>) => void): View;
    h1(builder?: (element: ViewElement<H1ElementAttributes>) => void): View;
    h2(builder?: (element: ViewElement<H2ElementAttributes>) => void): View;
    h3(builder?: (element: ViewElement<H3ElementAttributes>) => void): View;
    h4(builder?: (element: ViewElement<H4ElementAttributes>) => void): View;
    h5(builder?: (element: ViewElement<H5ElementAttributes>) => void): View;
    h6(builder?: (element: ViewElement<H6ElementAttributes>) => void): View;
    head(builder?: (element: ViewElement<HeadElementAttributes>) => void): View;
    header(builder?: (element: ViewElement<HeaderElementAttributes>) => void): View;
    hgroup(builder?: (element: ViewElement<HgroupElementAttributes>) => void): View;
    hr(builder?: (element: ViewElement<HrElementAttributes>) => void): View;
    html(builder?: (element: ViewElement<HtmlElementAttributes>) => void): View;
    i(builder?: (element: ViewElement<IElementAttributes>) => void): View;
    iframe(builder?: (element: ViewElement<IframeElementAttributes>) => void): View;
    image(builder?: (element: ViewElement<ImageElementAttributes>) => void): View;
    img(builder?: (element: ViewElement<ImgElementAttributes>) => void): View;
    input(builder?: (element: ViewElement<InputElementAttributes>) => void): View;
    ins(builder?: (element: ViewElement<InsElementAttributes>) => void): View;
    isindex(builder?: (element: ViewElement<IsindexElementAttributes>) => void): View;
    kbd(builder?: (element: ViewElement<KbdElementAttributes>) => void): View;
    keygen(builder?: (element: ViewElement<KeygenElementAttributes>) => void): View;
    label(builder?: (element: ViewElement<LabelElementAttributes>) => void): View;
    legend(builder?: (element: ViewElement<LegendElementAttributes>) => void): View;
    li(builder?: (element: ViewElement<LiElementAttributes>) => void): View;
    link(builder?: (element: ViewElement<LinkElementAttributes>) => void): View;
    listing(builder?: (element: ViewElement<ListingElementAttributes>) => void): View;
    main(builder?: (element: ViewElement<MainElementAttributes>) => void): View;
    map(builder?: (element: ViewElement<MapElementAttributes>) => void): View;
    mark(builder?: (element: ViewElement<MarkElementAttributes>) => void): View;
    marquee(builder?: (element: ViewElement<MarqueeElementAttributes>) => void): View;
    math(builder?: (element: ViewElement<MathElementAttributes>) => void): View;
    menu(builder?: (element: ViewElement<MenuElementAttributes>) => void): View;
    menuitem(builder?: (element: ViewElement<MenuitemElementAttributes>) => void): View;
    meta(builder?: (element: ViewElement<MetaElementAttributes>) => void): View;
    meter(builder?: (element: ViewElement<MeterElementAttributes>) => void): View;
    multicol(builder?: (element: ViewElement<MulticolElementAttributes>) => void): View;
    nav(builder?: (element: ViewElement<NavElementAttributes>) => void): View;
    nextid(builder?: (element: ViewElement<NextidElementAttributes>) => void): View;
    nobr(builder?: (element: ViewElement<NobrElementAttributes>) => void): View;
    noembed(builder?: (element: ViewElement<NoembedElementAttributes>) => void): View;
    noframes(builder?: (element: ViewElement<NoframesElementAttributes>) => void): View;
    noscript(builder?: (element: ViewElement<NoscriptElementAttributes>) => void): View;
    object(builder?: (element: ViewElement<ObjectElementAttributes>) => void): View;
    ol(builder?: (element: ViewElement<OlElementAttributes>) => void): View;
    optgroup(builder?: (element: ViewElement<OptgroupElementAttributes>) => void): View;
    option(builder?: (element: ViewElement<OptionElementAttributes>) => void): View;
    output(builder?: (element: ViewElement<OutputElementAttributes>) => void): View;
    p(builder?: (element: ViewElement<PElementAttributes>) => void): View;
    param(builder?: (element: ViewElement<ParamElementAttributes>) => void): View;
    picture(builder?: (element: ViewElement<PictureElementAttributes>) => void): View;
    plaintext(builder?: (element: ViewElement<PlaintextElementAttributes>) => void): View;
    pre(builder?: (element: ViewElement<PreElementAttributes>) => void): View;
    progress(builder?: (element: ViewElement<ProgressElementAttributes>) => void): View;
    q(builder?: (element: ViewElement<QElementAttributes>) => void): View;
    rb(builder?: (element: ViewElement<RbElementAttributes>) => void): View;
    rbc(builder?: (element: ViewElement<RbcElementAttributes>) => void): View;
    rp(builder?: (element: ViewElement<RpElementAttributes>) => void): View;
    rt(builder?: (element: ViewElement<RtElementAttributes>) => void): View;
    rtc(builder?: (element: ViewElement<RtcElementAttributes>) => void): View;
    ruby(builder?: (element: ViewElement<RubyElementAttributes>) => void): View;
    s(builder?: (element: ViewElement<SElementAttributes>) => void): View;
    samp(builder?: (element: ViewElement<SampElementAttributes>) => void): View;
    script(builder?: (element: ViewElement<ScriptElementAttributes>) => void): View;
    search(builder?: (element: ViewElement<SearchElementAttributes>) => void): View;
    section(builder?: (element: ViewElement<SectionElementAttributes>) => void): View;
    select(builder?: (element: ViewElement<SelectElementAttributes>) => void): View;
    shadow(builder?: (element: ViewElement<ShadowElementAttributes>) => void): View;
    slot(builder?: (element: ViewElement<SlotElementAttributes>) => void): View;
    small(builder?: (element: ViewElement<SmallElementAttributes>) => void): View;
    source(builder?: (element: ViewElement<SourceElementAttributes>) => void): View;
    spacer(builder?: (element: ViewElement<SpacerElementAttributes>) => void): View;
    span(builder?: (element: ViewElement<SpanElementAttributes>) => void): View;
    strike(builder?: (element: ViewElement<StrikeElementAttributes>) => void): View;
    strong(builder?: (element: ViewElement<StrongElementAttributes>) => void): View;
    style(builder?: (element: ViewElement<StyleElementAttributes>) => void): View;
    sub(builder?: (element: ViewElement<SubElementAttributes>) => void): View;
    summary(builder?: (element: ViewElement<SummaryElementAttributes>) => void): View;
    sup(builder?: (element: ViewElement<SupElementAttributes>) => void): View;
    svg(builder?: (element: ViewElement<SvgElementAttributes>) => void): View;
    table(builder?: (element: ViewElement<TableElementAttributes>) => void): View;
    tbody(builder?: (element: ViewElement<TbodyElementAttributes>) => void): View;
    td(builder?: (element: ViewElement<TdElementAttributes>) => void): View;
    template(builder?: (element: ViewElement<TemplateElementAttributes>) => void): View;
    textarea(builder?: (element: ViewElement<TextareaElementAttributes>) => void): View;
    tfoot(builder?: (element: ViewElement<TfootElementAttributes>) => void): View;
    th(builder?: (element: ViewElement<ThElementAttributes>) => void): View;
    thead(builder?: (element: ViewElement<TheadElementAttributes>) => void): View;
    time(builder?: (element: ViewElement<TimeElementAttributes>) => void): View;
    title(builder?: (element: ViewElement<TitleElementAttributes>) => void): View;
    tr(builder?: (element: ViewElement<TrElementAttributes>) => void): View;
    track(builder?: (element: ViewElement<TrackElementAttributes>) => void): View;
    tt(builder?: (element: ViewElement<TtElementAttributes>) => void): View;
    u(builder?: (element: ViewElement<UElementAttributes>) => void): View;
    ul(builder?: (element: ViewElement<UlElementAttributes>) => void): View;
    var(builder?: (element: ViewElement<VarElementAttributes>) => void): View;
    video(builder?: (element: ViewElement<VideoElementAttributes>) => void): View;
    wbr(builder?: (element: ViewElement<WbrElementAttributes>) => void): View;
    xmp(builder?: (element: ViewElement<XmpElementAttributes>) => void): View;
}

export interface ViewElements extends SpecialElements {
    a(builder?: (element: ViewElement<AElementAttributes>) => void): this;
    abbr(builder?: (element: ViewElement<AbbrElementAttributes>) => void): this;
    acronym(builder?: (element: ViewElement<AcronymElementAttributes>) => void): this;
    address(builder?: (element: ViewElement<AddressElementAttributes>) => void): this;
    applet(builder?: (element: ViewElement<AppletElementAttributes>) => void): this;
    area(builder?: (element: ViewElement<AreaElementAttributes>) => void): this;
    article(builder?: (element: ViewElement<ArticleElementAttributes>) => void): this;
    aside(builder?: (element: ViewElement<AsideElementAttributes>) => void): this;
    audio(builder?: (element: ViewElement<AudioElementAttributes>) => void): this;
    b(builder?: (element: ViewElement<BElementAttributes>) => void): this;
    base(builder?: (element: ViewElement<BaseElementAttributes>) => void): this;
    basefont(builder?: (element: ViewElement<BasefontElementAttributes>) => void): this;
    bdi(builder?: (element: ViewElement<BdiElementAttributes>) => void): this;
    bdo(builder?: (element: ViewElement<BdoElementAttributes>) => void): this;
    bgsound(builder?: (element: ViewElement<BgsoundElementAttributes>) => void): this;
    big(builder?: (element: ViewElement<BigElementAttributes>) => void): this;
    blink(builder?: (element: ViewElement<BlinkElementAttributes>) => void): this;
    blockquote(builder?: (element: ViewElement<BlockquoteElementAttributes>) => void): this;
    body(builder?: (element: ViewElement<BodyElementAttributes>) => void): this;
    br(builder?: (element: ViewElement<BrElementAttributes>) => void): this;
    button(builder?: (element: ViewElement<ButtonElementAttributes>) => void): this;
    canvas(builder?: (element: ViewElement<CanvasElementAttributes>) => void): this;
    caption(builder?: (element: ViewElement<CaptionElementAttributes>) => void): this;
    center(builder?: (element: ViewElement<CenterElementAttributes>) => void): this;
    cite(builder?: (element: ViewElement<CiteElementAttributes>) => void): this;
    code(builder?: (element: ViewElement<CodeElementAttributes>) => void): this;
    col(builder?: (element: ViewElement<ColElementAttributes>) => void): this;
    colgroup(builder?: (element: ViewElement<ColgroupElementAttributes>) => void): this;
    command(builder?: (element: ViewElement<CommandElementAttributes>) => void): this;
    content(builder?: (element: ViewElement<ContentElementAttributes>) => void): this;
    data(builder?: (element: ViewElement<DataElementAttributes>) => void): this;
    datalist(builder?: (element: ViewElement<DatalistElementAttributes>) => void): this;
    dd(builder?: (element: ViewElement<DdElementAttributes>) => void): this;
    del(builder?: (element: ViewElement<DelElementAttributes>) => void): this;
    details(builder?: (element: ViewElement<DetailsElementAttributes>) => void): this;
    dfn(builder?: (element: ViewElement<DfnElementAttributes>) => void): this;
    dialog(builder?: (element: ViewElement<DialogElementAttributes>) => void): this;
    dir(builder?: (element: ViewElement<DirElementAttributes>) => void): this;
    div(builder?: (element: ViewElement<DivElementAttributes>) => void): this;
    dl(builder?: (element: ViewElement<DlElementAttributes>) => void): this;
    dt(builder?: (element: ViewElement<DtElementAttributes>) => void): this;
    element(builder?: (element: ViewElement<ElementElementAttributes>) => void): this;
    em(builder?: (element: ViewElement<EmElementAttributes>) => void): this;
    embed(builder?: (element: ViewElement<EmbedElementAttributes>) => void): this;
    fieldset(builder?: (element: ViewElement<FieldsetElementAttributes>) => void): this;
    figcaption(builder?: (element: ViewElement<FigcaptionElementAttributes>) => void): this;
    figure(builder?: (element: ViewElement<FigureElementAttributes>) => void): this;
    font(builder?: (element: ViewElement<FontElementAttributes>) => void): this;
    footer(builder?: (element: ViewElement<FooterElementAttributes>) => void): this;
    form(builder?: (element: ViewElement<FormElementAttributes>) => void): this;
    frame(builder?: (element: ViewElement<FrameElementAttributes>) => void): this;
    frameset(builder?: (element: ViewElement<FramesetElementAttributes>) => void): this;
    h1(builder?: (element: ViewElement<H1ElementAttributes>) => void): this;
    h2(builder?: (element: ViewElement<H2ElementAttributes>) => void): this;
    h3(builder?: (element: ViewElement<H3ElementAttributes>) => void): this;
    h4(builder?: (element: ViewElement<H4ElementAttributes>) => void): this;
    h5(builder?: (element: ViewElement<H5ElementAttributes>) => void): this;
    h6(builder?: (element: ViewElement<H6ElementAttributes>) => void): this;
    head(builder?: (element: ViewElement<HeadElementAttributes>) => void): this;
    header(builder?: (element: ViewElement<HeaderElementAttributes>) => void): this;
    hgroup(builder?: (element: ViewElement<HgroupElementAttributes>) => void): this;
    hr(builder?: (element: ViewElement<HrElementAttributes>) => void): this;
    html(builder?: (element: ViewElement<HtmlElementAttributes>) => void): this;
    i(builder?: (element: ViewElement<IElementAttributes>) => void): this;
    iframe(builder?: (element: ViewElement<IframeElementAttributes>) => void): this;
    image(builder?: (element: ViewElement<ImageElementAttributes>) => void): this;
    img(builder?: (element: ViewElement<ImgElementAttributes>) => void): this;
    input(builder?: (element: ViewElement<InputElementAttributes>) => void): this;
    ins(builder?: (element: ViewElement<InsElementAttributes>) => void): this;
    isindex(builder?: (element: ViewElement<IsindexElementAttributes>) => void): this;
    kbd(builder?: (element: ViewElement<KbdElementAttributes>) => void): this;
    keygen(builder?: (element: ViewElement<KeygenElementAttributes>) => void): this;
    label(builder?: (element: ViewElement<LabelElementAttributes>) => void): this;
    legend(builder?: (element: ViewElement<LegendElementAttributes>) => void): this;
    li(builder?: (element: ViewElement<LiElementAttributes>) => void): this;
    link(builder?: (element: ViewElement<LinkElementAttributes>) => void): this;
    listing(builder?: (element: ViewElement<ListingElementAttributes>) => void): this;
    main(builder?: (element: ViewElement<MainElementAttributes>) => void): this;
    map(builder?: (element: ViewElement<MapElementAttributes>) => void): this;
    mark(builder?: (element: ViewElement<MarkElementAttributes>) => void): this;
    marquee(builder?: (element: ViewElement<MarqueeElementAttributes>) => void): this;
    math(builder?: (element: ViewElement<MathElementAttributes>) => void): this;
    menu(builder?: (element: ViewElement<MenuElementAttributes>) => void): this;
    menuitem(builder?: (element: ViewElement<MenuitemElementAttributes>) => void): this;
    meta(builder?: (element: ViewElement<MetaElementAttributes>) => void): this;
    meter(builder?: (element: ViewElement<MeterElementAttributes>) => void): this;
    multicol(builder?: (element: ViewElement<MulticolElementAttributes>) => void): this;
    nav(builder?: (element: ViewElement<NavElementAttributes>) => void): this;
    nextid(builder?: (element: ViewElement<NextidElementAttributes>) => void): this;
    nobr(builder?: (element: ViewElement<NobrElementAttributes>) => void): this;
    noembed(builder?: (element: ViewElement<NoembedElementAttributes>) => void): this;
    noframes(builder?: (element: ViewElement<NoframesElementAttributes>) => void): this;
    noscript(builder?: (element: ViewElement<NoscriptElementAttributes>) => void): this;
    object(builder?: (element: ViewElement<ObjectElementAttributes>) => void): this;
    ol(builder?: (element: ViewElement<OlElementAttributes>) => void): this;
    optgroup(builder?: (element: ViewElement<OptgroupElementAttributes>) => void): this;
    option(builder?: (element: ViewElement<OptionElementAttributes>) => void): this;
    output(builder?: (element: ViewElement<OutputElementAttributes>) => void): this;
    p(builder?: (element: ViewElement<PElementAttributes>) => void): this;
    param(builder?: (element: ViewElement<ParamElementAttributes>) => void): this;
    picture(builder?: (element: ViewElement<PictureElementAttributes>) => void): this;
    plaintext(builder?: (element: ViewElement<PlaintextElementAttributes>) => void): this;
    pre(builder?: (element: ViewElement<PreElementAttributes>) => void): this;
    progress(builder?: (element: ViewElement<ProgressElementAttributes>) => void): this;
    q(builder?: (element: ViewElement<QElementAttributes>) => void): this;
    rb(builder?: (element: ViewElement<RbElementAttributes>) => void): this;
    rbc(builder?: (element: ViewElement<RbcElementAttributes>) => void): this;
    rp(builder?: (element: ViewElement<RpElementAttributes>) => void): this;
    rt(builder?: (element: ViewElement<RtElementAttributes>) => void): this;
    rtc(builder?: (element: ViewElement<RtcElementAttributes>) => void): this;
    ruby(builder?: (element: ViewElement<RubyElementAttributes>) => void): this;
    s(builder?: (element: ViewElement<SElementAttributes>) => void): this;
    samp(builder?: (element: ViewElement<SampElementAttributes>) => void): this;
    script(builder?: (element: ViewElement<ScriptElementAttributes>) => void): this;
    search(builder?: (element: ViewElement<SearchElementAttributes>) => void): this;
    section(builder?: (element: ViewElement<SectionElementAttributes>) => void): this;
    select(builder?: (element: ViewElement<SelectElementAttributes>) => void): this;
    shadow(builder?: (element: ViewElement<ShadowElementAttributes>) => void): this;
    slot(builder?: (element: ViewElement<SlotElementAttributes>) => void): this;
    small(builder?: (element: ViewElement<SmallElementAttributes>) => void): this;
    source(builder?: (element: ViewElement<SourceElementAttributes>) => void): this;
    spacer(builder?: (element: ViewElement<SpacerElementAttributes>) => void): this;
    span(builder?: (element: ViewElement<SpanElementAttributes>) => void): this;
    strike(builder?: (element: ViewElement<StrikeElementAttributes>) => void): this;
    strong(builder?: (element: ViewElement<StrongElementAttributes>) => void): this;
    style(builder?: (element: ViewElement<StyleElementAttributes>) => void): this;
    sub(builder?: (element: ViewElement<SubElementAttributes>) => void): this;
    summary(builder?: (element: ViewElement<SummaryElementAttributes>) => void): this;
    sup(builder?: (element: ViewElement<SupElementAttributes>) => void): this;
    svg(builder?: (element: ViewElement<SvgElementAttributes>) => void): this;
    table(builder?: (element: ViewElement<TableElementAttributes>) => void): this;
    tbody(builder?: (element: ViewElement<TbodyElementAttributes>) => void): this;
    td(builder?: (element: ViewElement<TdElementAttributes>) => void): this;
    template(builder?: (element: ViewElement<TemplateElementAttributes>) => void): this;
    textarea(builder?: (element: ViewElement<TextareaElementAttributes>) => void): this;
    tfoot(builder?: (element: ViewElement<TfootElementAttributes>) => void): this;
    th(builder?: (element: ViewElement<ThElementAttributes>) => void): this;
    thead(builder?: (element: ViewElement<TheadElementAttributes>) => void): this;
    time(builder?: (element: ViewElement<TimeElementAttributes>) => void): this;
    title(builder?: (element: ViewElement<TitleElementAttributes>) => void): this;
    tr(builder?: (element: ViewElement<TrElementAttributes>) => void): this;
    track(builder?: (element: ViewElement<TrackElementAttributes>) => void): this;
    tt(builder?: (element: ViewElement<TtElementAttributes>) => void): this;
    u(builder?: (element: ViewElement<UElementAttributes>) => void): this;
    ul(builder?: (element: ViewElement<UlElementAttributes>) => void): this;
    var(builder?: (element: ViewElement<VarElementAttributes>) => void): this;
    video(builder?: (element: ViewElement<VideoElementAttributes>) => void): this;
    wbr(builder?: (element: ViewElement<WbrElementAttributes>) => void): this;
    xmp(builder?: (element: ViewElement<XmpElementAttributes>) => void): this;
}

export interface AElementAttributes extends SpecialAttributes, GlobalAttributes {
    charset(value: string): AElementAttributes;
    coords(value: string): AElementAttributes;
    download(value: string): AElementAttributes;
    href(value: string): AElementAttributes;
    hreflang(value: string): AElementAttributes;
    name(value: string): AElementAttributes;
    ping(value: string): AElementAttributes;
    referrerpolicy(value: string): AElementAttributes;
    rel(value: string): AElementAttributes;
    rev(value: string): AElementAttributes;
    shape(value: string): AElementAttributes;
    target(value: string): AElementAttributes;
    type(value: string): AElementAttributes;
}

export interface AbbrElementAttributes extends SpecialAttributes, GlobalAttributes {
}

export interface AcronymElementAttributes extends SpecialAttributes, GlobalAttributes {
}

export interface AddressElementAttributes extends SpecialAttributes, GlobalAttributes {
}

export interface AppletElementAttributes extends SpecialAttributes, GlobalAttributes {
    align(value: string): AppletElementAttributes;
    alt(value: string): AppletElementAttributes;
    archive(value: string): AppletElementAttributes;
    code(value: string): AppletElementAttributes;
    codebase(value: string): AppletElementAttributes;
    height(value: string): AppletElementAttributes;
    hspace(value: string): AppletElementAttributes;
    name(value: string): AppletElementAttributes;
    object(value: string): AppletElementAttributes;
    vspace(value: string): AppletElementAttributes;
    width(value: string): AppletElementAttributes;
}

export interface AreaElementAttributes extends SpecialAttributes, GlobalAttributes {
    alt(value: string): AreaElementAttributes;
    coords(value: string): AreaElementAttributes;
    download(value: string): AreaElementAttributes;
    href(value: string): AreaElementAttributes;
    hreflang(value: string): AreaElementAttributes;
    nohref(value: string): AreaElementAttributes;
    ping(value: string): AreaElementAttributes;
    referrerpolicy(value: string): AreaElementAttributes;
    rel(value: string): AreaElementAttributes;
    shape(value: string): AreaElementAttributes;
    target(value: string): AreaElementAttributes;
    type(value: string): AreaElementAttributes;
}

export interface ArticleElementAttributes extends SpecialAttributes, GlobalAttributes {
}

export interface AsideElementAttributes extends SpecialAttributes, GlobalAttributes {
}

export interface AudioElementAttributes extends SpecialAttributes, GlobalAttributes {
    autoplay(value: boolean): AudioElementAttributes;
    controls(value: boolean): AudioElementAttributes;
    crossorigin(value: string): AudioElementAttributes;
    loop(value: boolean): AudioElementAttributes;
    muted(value: boolean): AudioElementAttributes;
    preload(value: string): AudioElementAttributes;
    src(value: string): AudioElementAttributes;
}

export interface BElementAttributes extends SpecialAttributes, GlobalAttributes {
}

export interface BaseElementAttributes extends SpecialAttributes, GlobalAttributes {
    href(value: string): BaseElementAttributes;
    target(value: string): BaseElementAttributes;
}

export interface BasefontElementAttributes extends SpecialAttributes, GlobalAttributes {
    color(value: string): BasefontElementAttributes;
    face(value: string): BasefontElementAttributes;
    size(value: string): BasefontElementAttributes;
}

export interface BdiElementAttributes extends SpecialAttributes, GlobalAttributes {
}

export interface BdoElementAttributes extends SpecialAttributes, GlobalAttributes {
}

export interface BgsoundElementAttributes extends SpecialAttributes, GlobalAttributes {
}

export interface BigElementAttributes extends SpecialAttributes, GlobalAttributes {
}

export interface BlinkElementAttributes extends SpecialAttributes, GlobalAttributes {
}

export interface BlockquoteElementAttributes extends SpecialAttributes, GlobalAttributes {
    cite(value: string): BlockquoteElementAttributes;
}

export interface BodyElementAttributes extends SpecialAttributes, GlobalAttributes {
    alink(value: string): BodyElementAttributes;
    background(value: string): BodyElementAttributes;
    bgcolor(value: string): BodyElementAttributes;
    link(value: string): BodyElementAttributes;
    text(value: string): BodyElementAttributes;
    vlink(value: string): BodyElementAttributes;
}

export interface BrElementAttributes extends SpecialAttributes, GlobalAttributes {
    clear(value: string): BrElementAttributes;
}

export interface ButtonElementAttributes extends SpecialAttributes, GlobalAttributes {
    disabled(value: boolean): ButtonElementAttributes;
    form(value: string): ButtonElementAttributes;
    formaction(value: string): ButtonElementAttributes;
    formenctype(value: string): ButtonElementAttributes;
    formmethod(value: string): ButtonElementAttributes;
    formnovalidate(value: boolean): ButtonElementAttributes;
    formtarget(value: string): ButtonElementAttributes;
    name(value: string): ButtonElementAttributes;
    popovertarget(value: string): ButtonElementAttributes;
    popovertargetaction(value: string): ButtonElementAttributes;
    type(value: string): ButtonElementAttributes;
    value(value: string): ButtonElementAttributes;
}

export interface CanvasElementAttributes extends SpecialAttributes, GlobalAttributes {
    height(value: string): CanvasElementAttributes;
    width(value: string): CanvasElementAttributes;
}

export interface CaptionElementAttributes extends SpecialAttributes, GlobalAttributes {
    align(value: string): CaptionElementAttributes;
}

export interface CenterElementAttributes extends SpecialAttributes, GlobalAttributes {
}

export interface CiteElementAttributes extends SpecialAttributes, GlobalAttributes {
}

export interface CodeElementAttributes extends SpecialAttributes, GlobalAttributes {
}

export interface ColElementAttributes extends SpecialAttributes, GlobalAttributes {
    align(value: string): ColElementAttributes;
    char(value: string): ColElementAttributes;
    charoff(value: string): ColElementAttributes;
    span(value: string): ColElementAttributes;
    valign(value: string): ColElementAttributes;
    width(value: string): ColElementAttributes;
}

export interface ColgroupElementAttributes extends SpecialAttributes, GlobalAttributes {
    align(value: string): ColgroupElementAttributes;
    char(value: string): ColgroupElementAttributes;
    charoff(value: string): ColgroupElementAttributes;
    span(value: string): ColgroupElementAttributes;
    valign(value: string): ColgroupElementAttributes;
    width(value: string): ColgroupElementAttributes;
}

export interface CommandElementAttributes extends SpecialAttributes, GlobalAttributes {
}

export interface ContentElementAttributes extends SpecialAttributes, GlobalAttributes {
}

export interface DataElementAttributes extends SpecialAttributes, GlobalAttributes {
    value(value: string): DataElementAttributes;
}

export interface DatalistElementAttributes extends SpecialAttributes, GlobalAttributes {
}

export interface DdElementAttributes extends SpecialAttributes, GlobalAttributes {
}

export interface DelElementAttributes extends SpecialAttributes, GlobalAttributes {
    cite(value: string): DelElementAttributes;
    datetime(value: string): DelElementAttributes;
}

export interface DetailsElementAttributes extends SpecialAttributes, GlobalAttributes {
    open(value: boolean): DetailsElementAttributes;
}

export interface DfnElementAttributes extends SpecialAttributes, GlobalAttributes {
}

export interface DialogElementAttributes extends SpecialAttributes, GlobalAttributes {
    open(value: boolean): DialogElementAttributes;
}

export interface DirElementAttributes extends SpecialAttributes, GlobalAttributes {
    compact(value: string): DirElementAttributes;
}

export interface DivElementAttributes extends SpecialAttributes, GlobalAttributes {
    align(value: string): DivElementAttributes;
}

export interface DlElementAttributes extends SpecialAttributes, GlobalAttributes {
    compact(value: string): DlElementAttributes;
}

export interface DtElementAttributes extends SpecialAttributes, GlobalAttributes {
}

export interface ElementElementAttributes extends SpecialAttributes, GlobalAttributes {
}

export interface EmElementAttributes extends SpecialAttributes, GlobalAttributes {
}

export interface EmbedElementAttributes extends SpecialAttributes, GlobalAttributes {
    height(value: string): EmbedElementAttributes;
    src(value: string): EmbedElementAttributes;
    type(value: string): EmbedElementAttributes;
    width(value: string): EmbedElementAttributes;
}

export interface FieldsetElementAttributes extends SpecialAttributes, GlobalAttributes {
    disabled(value: boolean): FieldsetElementAttributes;
    form(value: string): FieldsetElementAttributes;
    name(value: string): FieldsetElementAttributes;
}

export interface FigcaptionElementAttributes extends SpecialAttributes, GlobalAttributes {
}

export interface FigureElementAttributes extends SpecialAttributes, GlobalAttributes {
}

export interface FontElementAttributes extends SpecialAttributes, GlobalAttributes {
    color(value: string): FontElementAttributes;
    face(value: string): FontElementAttributes;
    size(value: string): FontElementAttributes;
}

export interface FooterElementAttributes extends SpecialAttributes, GlobalAttributes {
}

export interface FormElementAttributes extends SpecialAttributes, GlobalAttributes {
    accept(value: string): FormElementAttributes;
    acceptCharset(value: string): FormElementAttributes;
    action(value: string): FormElementAttributes;
    autocomplete(value: string): FormElementAttributes;
    enctype(value: string): FormElementAttributes;
    method(value: string): FormElementAttributes;
    name(value: string): FormElementAttributes;
    novalidate(value: boolean): FormElementAttributes;
    target(value: string): FormElementAttributes;
}

export interface FrameElementAttributes extends SpecialAttributes, GlobalAttributes {
    frameborder(value: string): FrameElementAttributes;
    longdesc(value: string): FrameElementAttributes;
    marginheight(value: string): FrameElementAttributes;
    marginwidth(value: string): FrameElementAttributes;
    name(value: string): FrameElementAttributes;
    noresize(value: string): FrameElementAttributes;
    scrolling(value: string): FrameElementAttributes;
    src(value: string): FrameElementAttributes;
}

export interface FramesetElementAttributes extends SpecialAttributes, GlobalAttributes {
    cols(value: string): FramesetElementAttributes;
    rows(value: string): FramesetElementAttributes;
}

export interface H1ElementAttributes extends SpecialAttributes, GlobalAttributes {
    align(value: string): H1ElementAttributes;
}

export interface H2ElementAttributes extends SpecialAttributes, GlobalAttributes {
    align(value: string): H2ElementAttributes;
}

export interface H3ElementAttributes extends SpecialAttributes, GlobalAttributes {
    align(value: string): H3ElementAttributes;
}

export interface H4ElementAttributes extends SpecialAttributes, GlobalAttributes {
    align(value: string): H4ElementAttributes;
}

export interface H5ElementAttributes extends SpecialAttributes, GlobalAttributes {
    align(value: string): H5ElementAttributes;
}

export interface H6ElementAttributes extends SpecialAttributes, GlobalAttributes {
    align(value: string): H6ElementAttributes;
}

export interface HeadElementAttributes extends SpecialAttributes, GlobalAttributes {
    profile(value: string): HeadElementAttributes;
}

export interface HeaderElementAttributes extends SpecialAttributes, GlobalAttributes {
}

export interface HgroupElementAttributes extends SpecialAttributes, GlobalAttributes {
}

export interface HrElementAttributes extends SpecialAttributes, GlobalAttributes {
    align(value: string): HrElementAttributes;
    noshade(value: string): HrElementAttributes;
    size(value: string): HrElementAttributes;
    width(value: string): HrElementAttributes;
}

export interface HtmlElementAttributes extends SpecialAttributes, GlobalAttributes {
    manifest(value: string): HtmlElementAttributes;
    version(value: string): HtmlElementAttributes;
}

export interface IElementAttributes extends SpecialAttributes, GlobalAttributes {
}

export interface IframeElementAttributes extends SpecialAttributes, GlobalAttributes {
    align(value: string): IframeElementAttributes;
    allow(value: string): IframeElementAttributes;
    allowfullscreen(value: boolean): IframeElementAttributes;
    allowpaymentrequest(value: string): IframeElementAttributes;
    allowusermedia(value: string): IframeElementAttributes;
    frameborder(value: string): IframeElementAttributes;
    height(value: string): IframeElementAttributes;
    loading(value: string): IframeElementAttributes;
    longdesc(value: string): IframeElementAttributes;
    marginheight(value: string): IframeElementAttributes;
    marginwidth(value: string): IframeElementAttributes;
    name(value: string): IframeElementAttributes;
    referrerpolicy(value: string): IframeElementAttributes;
    sandbox(value: string): IframeElementAttributes;
    scrolling(value: string): IframeElementAttributes;
    src(value: string): IframeElementAttributes;
    srcdoc(value: string): IframeElementAttributes;
    width(value: string): IframeElementAttributes;
}

export interface ImageElementAttributes extends SpecialAttributes, GlobalAttributes {
}

export interface ImgElementAttributes extends SpecialAttributes, GlobalAttributes {
    align(value: string): ImgElementAttributes;
    alt(value: string): ImgElementAttributes;
    border(value: string): ImgElementAttributes;
    crossorigin(value: string): ImgElementAttributes;
    decoding(value: string): ImgElementAttributes;
    fetchpriority(value: string): ImgElementAttributes;
    height(value: string): ImgElementAttributes;
    hspace(value: string): ImgElementAttributes;
    ismap(value: boolean): ImgElementAttributes;
    loading(value: string): ImgElementAttributes;
    longdesc(value: string): ImgElementAttributes;
    name(value: string): ImgElementAttributes;
    referrerpolicy(value: string): ImgElementAttributes;
    sizes(value: string): ImgElementAttributes;
    src(value: string): ImgElementAttributes;
    srcset(value: string): ImgElementAttributes;
    usemap(value: string): ImgElementAttributes;
    vspace(value: string): ImgElementAttributes;
    width(value: string): ImgElementAttributes;
}

export interface InputElementAttributes extends SpecialAttributes, GlobalAttributes {
    accept(value: string): InputElementAttributes;
    align(value: string): InputElementAttributes;
    alt(value: string): InputElementAttributes;
    autocomplete(value: string): InputElementAttributes;
    checked(value: boolean): InputElementAttributes;
    dirname(value: string): InputElementAttributes;
    disabled(value: boolean): InputElementAttributes;
    form(value: string): InputElementAttributes;
    formaction(value: string): InputElementAttributes;
    formenctype(value: string): InputElementAttributes;
    formmethod(value: string): InputElementAttributes;
    formnovalidate(value: boolean): InputElementAttributes;
    formtarget(value: string): InputElementAttributes;
    height(value: string): InputElementAttributes;
    ismap(value: boolean): InputElementAttributes;
    list(value: string): InputElementAttributes;
    max(value: string): InputElementAttributes;
    maxlength(value: string): InputElementAttributes;
    min(value: string): InputElementAttributes;
    minlength(value: string): InputElementAttributes;
    multiple(value: boolean): InputElementAttributes;
    name(value: string): InputElementAttributes;
    pattern(value: string): InputElementAttributes;
    placeholder(value: string): InputElementAttributes;
    popovertarget(value: string): InputElementAttributes;
    popovertargetaction(value: string): InputElementAttributes;
    readonly(value: boolean): InputElementAttributes;
    required(value: boolean): InputElementAttributes;
    size(value: string): InputElementAttributes;
    src(value: string): InputElementAttributes;
    step(value: string): InputElementAttributes;
    type(value: string): InputElementAttributes;
    usemap(value: string): InputElementAttributes;
    value(value: string): InputElementAttributes;
    width(value: string): InputElementAttributes;
}

export interface InsElementAttributes extends SpecialAttributes, GlobalAttributes {
    cite(value: string): InsElementAttributes;
    datetime(value: string): InsElementAttributes;
}

export interface IsindexElementAttributes extends SpecialAttributes, GlobalAttributes {
    prompt(value: string): IsindexElementAttributes;
}

export interface KbdElementAttributes extends SpecialAttributes, GlobalAttributes {
}

export interface KeygenElementAttributes extends SpecialAttributes, GlobalAttributes {
}

export interface LabelElementAttributes extends SpecialAttributes, GlobalAttributes {
    for(value: string): LabelElementAttributes;
    form(value: string): LabelElementAttributes;
}

export interface LegendElementAttributes extends SpecialAttributes, GlobalAttributes {
    align(value: string): LegendElementAttributes;
}

export interface LiElementAttributes extends SpecialAttributes, GlobalAttributes {
    type(value: string): LiElementAttributes;
    value(value: string): LiElementAttributes;
}

export interface LinkElementAttributes extends SpecialAttributes, GlobalAttributes {
    as(value: string): LinkElementAttributes;
    blocking(value: string): LinkElementAttributes;
    charset(value: string): LinkElementAttributes;
    color(value: string): LinkElementAttributes;
    crossorigin(value: string): LinkElementAttributes;
    disabled(value: boolean): LinkElementAttributes;
    fetchpriority(value: string): LinkElementAttributes;
    href(value: string): LinkElementAttributes;
    hreflang(value: string): LinkElementAttributes;
    imagesizes(value: string): LinkElementAttributes;
    imagesrcset(value: string): LinkElementAttributes;
    integrity(value: string): LinkElementAttributes;
    media(value: string): LinkElementAttributes;
    referrerpolicy(value: string): LinkElementAttributes;
    rel(value: string): LinkElementAttributes;
    rev(value: string): LinkElementAttributes;
    sizes(value: string): LinkElementAttributes;
    target(value: string): LinkElementAttributes;
    type(value: string): LinkElementAttributes;
}

export interface ListingElementAttributes extends SpecialAttributes, GlobalAttributes {
}

export interface MainElementAttributes extends SpecialAttributes, GlobalAttributes {
}

export interface MapElementAttributes extends SpecialAttributes, GlobalAttributes {
    name(value: string): MapElementAttributes;
}

export interface MarkElementAttributes extends SpecialAttributes, GlobalAttributes {
}

export interface MarqueeElementAttributes extends SpecialAttributes, GlobalAttributes {
}

export interface MathElementAttributes extends SpecialAttributes, GlobalAttributes {
}

export interface MenuElementAttributes extends SpecialAttributes, GlobalAttributes {
    compact(value: string): MenuElementAttributes;
}

export interface MenuitemElementAttributes extends SpecialAttributes, GlobalAttributes {
}

export interface MetaElementAttributes extends SpecialAttributes, GlobalAttributes {
    charset(value: string): MetaElementAttributes;
    content(value: string): MetaElementAttributes;
    httpEquiv(value: string): MetaElementAttributes;
    media(value: string): MetaElementAttributes;
    name(value: string): MetaElementAttributes;
    scheme(value: string): MetaElementAttributes;
}

export interface MeterElementAttributes extends SpecialAttributes, GlobalAttributes {
    high(value: string): MeterElementAttributes;
    low(value: string): MeterElementAttributes;
    max(value: string): MeterElementAttributes;
    min(value: string): MeterElementAttributes;
    optimum(value: string): MeterElementAttributes;
    value(value: string): MeterElementAttributes;
}

export interface MulticolElementAttributes extends SpecialAttributes, GlobalAttributes {
}

export interface NavElementAttributes extends SpecialAttributes, GlobalAttributes {
}

export interface NextidElementAttributes extends SpecialAttributes, GlobalAttributes {
}

export interface NobrElementAttributes extends SpecialAttributes, GlobalAttributes {
}

export interface NoembedElementAttributes extends SpecialAttributes, GlobalAttributes {
}

export interface NoframesElementAttributes extends SpecialAttributes, GlobalAttributes {
}

export interface NoscriptElementAttributes extends SpecialAttributes, GlobalAttributes {
}

export interface ObjectElementAttributes extends SpecialAttributes, GlobalAttributes {
    align(value: string): ObjectElementAttributes;
    archive(value: string): ObjectElementAttributes;
    border(value: string): ObjectElementAttributes;
    classid(value: string): ObjectElementAttributes;
    codebase(value: string): ObjectElementAttributes;
    codetype(value: string): ObjectElementAttributes;
    data(value: string): ObjectElementAttributes;
    declare(value: string): ObjectElementAttributes;
    form(value: string): ObjectElementAttributes;
    height(value: string): ObjectElementAttributes;
    hspace(value: string): ObjectElementAttributes;
    name(value: string): ObjectElementAttributes;
    standby(value: string): ObjectElementAttributes;
    type(value: string): ObjectElementAttributes;
    typemustmatch(value: string): ObjectElementAttributes;
    usemap(value: string): ObjectElementAttributes;
    vspace(value: string): ObjectElementAttributes;
    width(value: string): ObjectElementAttributes;
}

export interface OlElementAttributes extends SpecialAttributes, GlobalAttributes {
    compact(value: string): OlElementAttributes;
    reversed(value: boolean): OlElementAttributes;
    start(value: string): OlElementAttributes;
    type(value: string): OlElementAttributes;
}

export interface OptgroupElementAttributes extends SpecialAttributes, GlobalAttributes {
    disabled(value: boolean): OptgroupElementAttributes;
    label(value: string): OptgroupElementAttributes;
}

export interface OptionElementAttributes extends SpecialAttributes, GlobalAttributes {
    disabled(value: boolean): OptionElementAttributes;
    label(value: string): OptionElementAttributes;
    selected(value: boolean): OptionElementAttributes;
    value(value: string): OptionElementAttributes;
}

export interface OutputElementAttributes extends SpecialAttributes, GlobalAttributes {
    for(value: string): OutputElementAttributes;
    form(value: string): OutputElementAttributes;
    name(value: string): OutputElementAttributes;
}

export interface PElementAttributes extends SpecialAttributes, GlobalAttributes {
    align(value: string): PElementAttributes;
}

export interface ParamElementAttributes extends SpecialAttributes, GlobalAttributes {
    name(value: string): ParamElementAttributes;
    type(value: string): ParamElementAttributes;
    value(value: string): ParamElementAttributes;
    valuetype(value: string): ParamElementAttributes;
}

export interface PictureElementAttributes extends SpecialAttributes, GlobalAttributes {
}

export interface PlaintextElementAttributes extends SpecialAttributes, GlobalAttributes {
}

export interface PreElementAttributes extends SpecialAttributes, GlobalAttributes {
    width(value: string): PreElementAttributes;
}

export interface ProgressElementAttributes extends SpecialAttributes, GlobalAttributes {
    max(value: string): ProgressElementAttributes;
    value(value: string): ProgressElementAttributes;
}

export interface QElementAttributes extends SpecialAttributes, GlobalAttributes {
    cite(value: string): QElementAttributes;
}

export interface RbElementAttributes extends SpecialAttributes, GlobalAttributes {
}

export interface RbcElementAttributes extends SpecialAttributes, GlobalAttributes {
}

export interface RpElementAttributes extends SpecialAttributes, GlobalAttributes {
}

export interface RtElementAttributes extends SpecialAttributes, GlobalAttributes {
}

export interface RtcElementAttributes extends SpecialAttributes, GlobalAttributes {
}

export interface RubyElementAttributes extends SpecialAttributes, GlobalAttributes {
}

export interface SElementAttributes extends SpecialAttributes, GlobalAttributes {
}

export interface SampElementAttributes extends SpecialAttributes, GlobalAttributes {
}

export interface ScriptElementAttributes extends SpecialAttributes, GlobalAttributes {
    async(value: boolean): ScriptElementAttributes;
    blocking(value: string): ScriptElementAttributes;
    charset(value: string): ScriptElementAttributes;
    crossorigin(value: string): ScriptElementAttributes;
    defer(value: boolean): ScriptElementAttributes;
    fetchpriority(value: string): ScriptElementAttributes;
    integrity(value: string): ScriptElementAttributes;
    language(value: string): ScriptElementAttributes;
    nomodule(value: boolean): ScriptElementAttributes;
    referrerpolicy(value: string): ScriptElementAttributes;
    src(value: string): ScriptElementAttributes;
    type(value: string): ScriptElementAttributes;
}

export interface SearchElementAttributes extends SpecialAttributes, GlobalAttributes {
}

export interface SectionElementAttributes extends SpecialAttributes, GlobalAttributes {
}

export interface SelectElementAttributes extends SpecialAttributes, GlobalAttributes {
    autocomplete(value: string): SelectElementAttributes;
    disabled(value: boolean): SelectElementAttributes;
    form(value: string): SelectElementAttributes;
    multiple(value: boolean): SelectElementAttributes;
    name(value: string): SelectElementAttributes;
    required(value: boolean): SelectElementAttributes;
    size(value: string): SelectElementAttributes;
}

export interface ShadowElementAttributes extends SpecialAttributes, GlobalAttributes {
}

export interface SlotElementAttributes extends SpecialAttributes, GlobalAttributes {
    name(value: string): SlotElementAttributes;
}

export interface SmallElementAttributes extends SpecialAttributes, GlobalAttributes {
}

export interface SourceElementAttributes extends SpecialAttributes, GlobalAttributes {
    height(value: string): SourceElementAttributes;
    media(value: string): SourceElementAttributes;
    sizes(value: string): SourceElementAttributes;
    src(value: string): SourceElementAttributes;
    srcset(value: string): SourceElementAttributes;
    type(value: string): SourceElementAttributes;
    width(value: string): SourceElementAttributes;
}

export interface SpacerElementAttributes extends SpecialAttributes, GlobalAttributes {
}

export interface SpanElementAttributes extends SpecialAttributes, GlobalAttributes {
}

export interface StrikeElementAttributes extends SpecialAttributes, GlobalAttributes {
}

export interface StrongElementAttributes extends SpecialAttributes, GlobalAttributes {
}

export interface StyleElementAttributes extends SpecialAttributes, GlobalAttributes {
    blocking(value: string): StyleElementAttributes;
    media(value: string): StyleElementAttributes;
    type(value: string): StyleElementAttributes;
}

export interface SubElementAttributes extends SpecialAttributes, GlobalAttributes {
}

export interface SummaryElementAttributes extends SpecialAttributes, GlobalAttributes {
}

export interface SupElementAttributes extends SpecialAttributes, GlobalAttributes {
}

export interface SvgElementAttributes extends SpecialAttributes, GlobalAttributes {
}

export interface TableElementAttributes extends SpecialAttributes, GlobalAttributes {
    align(value: string): TableElementAttributes;
    bgcolor(value: string): TableElementAttributes;
    border(value: string): TableElementAttributes;
    cellpadding(value: string): TableElementAttributes;
    cellspacing(value: string): TableElementAttributes;
    frame(value: string): TableElementAttributes;
    rules(value: string): TableElementAttributes;
    summary(value: string): TableElementAttributes;
    width(value: string): TableElementAttributes;
}

export interface TbodyElementAttributes extends SpecialAttributes, GlobalAttributes {
    align(value: string): TbodyElementAttributes;
    char(value: string): TbodyElementAttributes;
    charoff(value: string): TbodyElementAttributes;
    valign(value: string): TbodyElementAttributes;
}

export interface TdElementAttributes extends SpecialAttributes, GlobalAttributes {
    abbr(value: string): TdElementAttributes;
    align(value: string): TdElementAttributes;
    axis(value: string): TdElementAttributes;
    bgcolor(value: string): TdElementAttributes;
    char(value: string): TdElementAttributes;
    charoff(value: string): TdElementAttributes;
    colspan(value: string): TdElementAttributes;
    headers(value: string): TdElementAttributes;
    height(value: string): TdElementAttributes;
    nowrap(value: string): TdElementAttributes;
    rowspan(value: string): TdElementAttributes;
    scope(value: string): TdElementAttributes;
    valign(value: string): TdElementAttributes;
    width(value: string): TdElementAttributes;
}

export interface TemplateElementAttributes extends SpecialAttributes, GlobalAttributes {
}

export interface TextareaElementAttributes extends SpecialAttributes, GlobalAttributes {
    autocomplete(value: string): TextareaElementAttributes;
    cols(value: string): TextareaElementAttributes;
    dirname(value: string): TextareaElementAttributes;
    disabled(value: boolean): TextareaElementAttributes;
    form(value: string): TextareaElementAttributes;
    maxlength(value: string): TextareaElementAttributes;
    minlength(value: string): TextareaElementAttributes;
    name(value: string): TextareaElementAttributes;
    placeholder(value: string): TextareaElementAttributes;
    readonly(value: boolean): TextareaElementAttributes;
    required(value: boolean): TextareaElementAttributes;
    rows(value: string): TextareaElementAttributes;
    wrap(value: string): TextareaElementAttributes;
}

export interface TfootElementAttributes extends SpecialAttributes, GlobalAttributes {
    align(value: string): TfootElementAttributes;
    char(value: string): TfootElementAttributes;
    charoff(value: string): TfootElementAttributes;
    valign(value: string): TfootElementAttributes;
}

export interface ThElementAttributes extends SpecialAttributes, GlobalAttributes {
    abbr(value: string): ThElementAttributes;
    align(value: string): ThElementAttributes;
    axis(value: string): ThElementAttributes;
    bgcolor(value: string): ThElementAttributes;
    char(value: string): ThElementAttributes;
    charoff(value: string): ThElementAttributes;
    colspan(value: string): ThElementAttributes;
    headers(value: string): ThElementAttributes;
    height(value: string): ThElementAttributes;
    nowrap(value: string): ThElementAttributes;
    rowspan(value: string): ThElementAttributes;
    scope(value: string): ThElementAttributes;
    valign(value: string): ThElementAttributes;
    width(value: string): ThElementAttributes;
}

export interface TheadElementAttributes extends SpecialAttributes, GlobalAttributes {
    align(value: string): TheadElementAttributes;
    char(value: string): TheadElementAttributes;
    charoff(value: string): TheadElementAttributes;
    valign(value: string): TheadElementAttributes;
}

export interface TimeElementAttributes extends SpecialAttributes, GlobalAttributes {
    datetime(value: string): TimeElementAttributes;
}

export interface TitleElementAttributes extends SpecialAttributes, GlobalAttributes {
}

export interface TrElementAttributes extends SpecialAttributes, GlobalAttributes {
    align(value: string): TrElementAttributes;
    bgcolor(value: string): TrElementAttributes;
    char(value: string): TrElementAttributes;
    charoff(value: string): TrElementAttributes;
    valign(value: string): TrElementAttributes;
}

export interface TrackElementAttributes extends SpecialAttributes, GlobalAttributes {
    default(value: boolean): TrackElementAttributes;
    kind(value: string): TrackElementAttributes;
    label(value: string): TrackElementAttributes;
    src(value: string): TrackElementAttributes;
    srclang(value: string): TrackElementAttributes;
}

export interface TtElementAttributes extends SpecialAttributes, GlobalAttributes {
}

export interface UElementAttributes extends SpecialAttributes, GlobalAttributes {
}

export interface UlElementAttributes extends SpecialAttributes, GlobalAttributes {
    compact(value: string): UlElementAttributes;
    type(value: string): UlElementAttributes;
}

export interface VarElementAttributes extends SpecialAttributes, GlobalAttributes {
}

export interface VideoElementAttributes extends SpecialAttributes, GlobalAttributes {
    autoplay(value: boolean): VideoElementAttributes;
    controls(value: boolean): VideoElementAttributes;
    crossorigin(value: string): VideoElementAttributes;
    height(value: string): VideoElementAttributes;
    loop(value: boolean): VideoElementAttributes;
    muted(value: boolean): VideoElementAttributes;
    playsinline(value: boolean): VideoElementAttributes;
    poster(value: string): VideoElementAttributes;
    preload(value: string): VideoElementAttributes;
    src(value: string): VideoElementAttributes;
    width(value: string): VideoElementAttributes;
}

export interface WbrElementAttributes extends SpecialAttributes, GlobalAttributes {
}

export interface XmpElementAttributes extends SpecialAttributes, GlobalAttributes {
}

export const booleanAttributes: Set<string> = new Set();
booleanAttributes.add("allowfullscreen")
booleanAttributes.add("async")
booleanAttributes.add("autofocus")
booleanAttributes.add("autoplay")
booleanAttributes.add("checked")
booleanAttributes.add("controls")
booleanAttributes.add("default")
booleanAttributes.add("defer")
booleanAttributes.add("disabled")
booleanAttributes.add("formnovalidate")
booleanAttributes.add("inert")
booleanAttributes.add("ismap")
booleanAttributes.add("itemscope")
booleanAttributes.add("loop")
booleanAttributes.add("multiple")
booleanAttributes.add("muted")
booleanAttributes.add("nomodule")
booleanAttributes.add("novalidate")
booleanAttributes.add("open")
booleanAttributes.add("playsinline")
booleanAttributes.add("readonly")
booleanAttributes.add("required")
booleanAttributes.add("reversed")
booleanAttributes.add("selected")
