const BASE_URL = "https://dev.to/api"


function api_fetch<T>(path: string, init?: RequestInit): Promise<T> {
    return fetch(BASE_URL + path, init).then(x => x.json())
}
function dictToSearchParams(
    params: Record<string, string | number | boolean | undefined | null>
) {
    const sp = new URLSearchParams();

    for (const [key, value] of Object.entries(params)) {
        if (value !== undefined && value !== null) {
            sp.append(key, String(value));
        }
    }

    return sp.toString();
}
export namespace devto {

    export interface Article {
        type_of: "article";
        id: number;
        title: string;
        description: string;
        readable_publish_date: string;
        slug: string;
        path: string;
        url: string;
        comments_count: number;
        public_reactions_count: number;
        collection_id: number | null;
        published_timestamp: string;
        positive_reactions_count: number;
        cover_image: string;
        social_image: string;
        canonical_url: string;
        created_at: string;
        edited_at: string | null;
        crossposted_at: string | null;
        published_at: string;
        last_comment_at: string;
        reading_time_minutes: number;
        tag_list: string[];
        tags: string;

        user: User;
        organization: Organization;
        body_html?: string;
        body_markdown?: string;
        flare_tag: FlareTag;
    }

    export interface User {
        name: string;
        username: string;
        twitter_username: string;
        github_username: string;
        user_id: number;
        website_url: string | null;
        profile_image: string;
        profile_image_90: string;
    }

    export interface Organization {
        name: string;
        username: string;
        slug: string;
        profile_image: string;
        profile_image_90: string;
    }

    export interface FlareTag {
        name: string;
        bg_color_hex: string;
        text_color_hex: string;
    }

    export namespace articles {
        export function search(username: string, opts?: { page?: number, per_page?: number, tag?: string, }): Promise<Article[]> {
            return api_fetch(`/articles?` + dictToSearchParams({
                username,
                ...opts
            }))
        }

        export function fetch_detailed(article_id: string, opts?: { page?: number, per_page?: number, tag?: string, }): Promise<Article> {
            return api_fetch(`/articles/${article_id}?`)
        }
    }
}