<?php
class CategoryList implements JsonSerializable {
    
    private $categories;
    
    /**
     * Accept an array of entities
     *
     * @param array $data The array containing entities
     */
    public function __construct(array $data) {
        $this->categories = $data;
    }
    
    public function getCategories() {
        return $this->categories;
    }
    
    public function jsonSerialize() {
        return [
            'categories' => $this->categories
        ];
    }
}