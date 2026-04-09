export async function GET() {
  const robotsTxt = `# As a condition of accessing this website, you agree to abide by the following
# content signals:
#
# (a)  If a Content-Signal = yes, you may collect content for the corresponding use.
# (b)  If a Content-Signal = no, you may not collect content for the corresponding use.
# (c)  If the website operator does not include a Content-Signal for a corresponding use,
#      the website operator neither grants nor restricts permission via Content-Signal
#      with respect to the corresponding use.
#
# search:   building a search index and providing search results
# ai-input: inputting content into AI models
# ai-train: training or fine-tuning AI models

User-agent: *
Content-Signal: search=yes,ai-train=no
Allow: /

User-agent: Amazonbot
Disallow: /

User-agent: Applebot-Extended
Disallow: /

User-agent: Bytespider
Disallow: /

User-agent: CCBot
Disallow: /

# AI CRAWLER CONFIGURATION
# Allow AI crawlers to access content for citations

# OPENAI - ChatGPT
User-agent: OAI-SearchBot
Allow: /

User-agent: ChatGPT-User
Allow: /

User-agent: ChatGPT-User/2.0
Allow: /

User-agent: GPTBot
Allow: /

# ANTHROPIC - Claude
User-agent: ClaudeBot
Allow: /

User-agent: claude-web
Allow: /

User-agent: anthropic-ai
Allow: /

# PERPLEXITY
User-agent: PerplexityBot
Allow: /

User-agent: Perplexity-User
Allow: /

# GOOGLE - Gemini
User-agent: Google-Extended
Allow: /

Sitemap: https://www.korefi.ai/sitemap.xml`

  return new Response(robotsTxt, {
    headers: {
      'Content-Type': 'text/plain',
    },
  })
}
